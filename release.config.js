module.exports = {
    release: {
        branches: [
            'master',
            { name: 'canary', channel: 'canary', prerelease: true },
        ],
    },
    plugins: [
        [
            '@semantic-release/commit-analyzer',
            {
                parser: 'conventionalcommits',
                releaseRules: [
                    {
                        scope: 'release',
                        release: false,
                    },
                ],
            },
        ],
        [
            '@semantic-release/release-notes-generator',
            {
                parser: 'conventionalcommits',
            },
        ],
        '@semantic-release/changelog',
        '@semantic-release/npm',
        [
            '@semantic-release/git',
            {
                assets: ['package.json', 'package-lock.json', 'CHANGELOG.md'],
                message:
                    'chore(release): Release ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
            },
        ],
        ['@semantic-release/github', { assets: ['dist/**'] }],
    ],
};
