# Private object download authority

`GET /api/storage/objects/uploads/<key>` reads from `PRIVATE_OBJECT_DIR`.
Knowledge of a key and optional object ACL metadata do not grant access.
The route checks application records before opening an object or stream:

| Resource reference | Allowed reader |
| --- | --- |
| Any repository file record | Exact nonempty repository shared admin password |
| Song, with no repository reference | Anonymous listeners |
| Clan document, with no repository or song reference | Current unexpired session, existing user, no active ban |
| Unregistered upload | Exact nonempty repository shared admin password |

Repository records take precedence if multiple resource types reference a key.
A clan administrator can register document URLs, so that role never grants
repository access. Publishing a song is an existing shared-admin operation;
song publication takes precedence over a document reference. The shared admin
retains global upload authority. Missing or failed database lookups fail closed.

The three existing web-client references are matched exactly:
`/objects/uploads/<key>`, `uploads/<key>`, and `/uploads/<key>`. Path segments
must be nonempty and must not contain dot traversal, backslashes or controls.
External URLs and undocumented legacy aliases are not inferred as authority.

All successful download responses from this conditional private-object route use
`Cache-Control: private, no-store` after provider headers are copied, and merge
`Vary: Authorization, X-Admin-Password`. Songs still stream anonymously, but
their mutable database classification is checked on subsequent requests.
The separate public-assets route and short-lived admin signed downloads retain
their existing behavior. Previously cached responses or issued signed URLs
cannot be retroactively revoked by this source change.

Release acceptance must verify representative existing song/document/repository
references, browser playback and downloads, actual ingress caching, and database
availability/query cost in an approved isolated environment. No production
objects, provider ACLs, credentials or database records were changed by this
patch. Database post-merge schema pushes remain a separate approval gate.
