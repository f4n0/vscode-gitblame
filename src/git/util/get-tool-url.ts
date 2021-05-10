import { Uri } from "vscode";
import { URL } from "url";

import type { Commit } from "./stream-parsing";

import { isUrl } from "../../util/is-url";
import { split } from "../../util/split";
import { defaultWebPath } from "./default-web-path";
import { getProperty } from "../../util/property";
import {
    getActiveFileOrigin,
    getRelativePathOfActiveFile,
    getRemoteUrl,
} from "./gitcommand";
import { projectNameFromOrigin } from "./project-name-from-origin";
import { stripGitRemoteUrl } from "./strip-git-remote-url";
import { InfoTokens, parseTokens } from "../../util/textdecorator";
import { isUncomitted } from "./uncommitted";
import { errorMessage } from "../../util/message";
import { extensionName } from "../../extension-name";

type ToolUrlTokens = {
    "hash": string;
    "project.name": string;
    "project.remote": string;
    "gitorigin.hostname": (index?: string) => string | undefined;
    "gitorigin.path": (index?: string) => string | undefined;
    "file.path": string;
} & InfoTokens;

function getDefaultToolUrl(
    origin: string,
    commitInfo: Commit,
): Uri | undefined {
    const attemptedURL = defaultWebPath(origin, commitInfo.hash);

    if (attemptedURL) {
        return Uri.parse(attemptedURL, true);
    }
}

function gitOriginHostname(origin: string): (index?: string) => string {
    try {
        const { hostname } = new URL(origin);
        return (index?: string): string => {

            if (index === '') {
                return hostname;
            }

            const parts = hostname.split('.');

            return parts[Number(index)] || 'invalid-index';
        };
    } catch {
        return () => 'no-origin-url'
    }
}

export function gitRemotePath(remote: string): (index?: string) => string {
    if (/^[a-z]+?@/.test(remote)) {
        const [, path] = split(remote, ':');
        return (index?: string): string => {
            if (index === '') {
                return "";
            }

            const parts = path.split('/').filter(a => !!a);
            return parts[Number(index)] || 'invalid-index';
        }
    }
    try {
        const { pathname } = new URL(remote);
        return (index?: string): string => {

            if (index === '') {
                return pathname;
            }

            const parts = pathname.split('/').filter(a => !!a);
            return parts[Number(index)] || 'invalid-index';
        };
    } catch {
        return () => 'no-remote-url'
    }
}

async function generateUrlTokens(commit: Commit): Promise<[string, ToolUrlTokens]> {
    const remoteName = getProperty("remoteName", "origin");

    const remote = getRemoteUrl(remoteName);
    const origin = await getActiveFileOrigin(remoteName);
    const relativePath = await getRelativePathOfActiveFile();
    const projectName = projectNameFromOrigin(origin);
    const remoteUrl = stripGitRemoteUrl(await remote);

    return [origin, {
        "hash": commit.hash,
        "project.name": projectName,
        "project.remote": remoteUrl,
        "gitorigin.hostname": gitOriginHostname(defaultWebPath(remoteUrl, "")),
        "gitorigin.path": gitRemotePath(remoteUrl),
        "file.path": relativePath,
    }];
}

export async function getToolUrl(
    commit?: Commit,
): Promise<Uri | undefined> {
    if (!commit || isUncomitted(commit)) {
        return;
    }

    const commitUrl = getProperty("commitUrl", "");

    const [origin, tokens] = await generateUrlTokens(commit);

    const parsedUrl = parseTokens(commitUrl, tokens);

    if (isUrl(parsedUrl)) {
        return Uri.parse(parsedUrl, true);
    } else if (!parsedUrl && origin) {
        return getDefaultToolUrl(origin, commit);
    } else if (!origin) {
        return undefined;
    } else {
        void errorMessage(
            `Malformed ${ extensionName }.commitUrl. Expands to: '${ parsedUrl }'`,
        );
    }
}