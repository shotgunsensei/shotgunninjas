---
name: Autoscale large file transfers
description: Why large file downloads/uploads must bypass the app server on Autoscale deployments, and the presigned-URL pattern used here.
---

# Autoscale (Cloud Run) terminates large proxied responses

Streaming or proxying a large (multi-GB) HTTP response *through* the Express API
server fails on the Replit Autoscale deployment target (Cloud Run-based). The
proxy terminates the response early — symptom in deployment logs was status 200
followed by "request aborted" after only ~600-700ms / tens of MB transferred.

**Why:** Autoscale's request/response proxy caps long-running large response
bodies; it is not a fit for serving big files byte-by-byte from the app process.

**How to apply:** For any large file transfer (download OR upload), do not route
the bytes through the app. Hand the browser a short-lived **presigned URL** and
let it talk to object storage (GCS) directly:
- Download: an admin-gated JSON endpoint mints a presigned GET URL
  (`getObjectEntityDownloadURL`, TTL ~300s) and returns it; the browser navigates
  to it. Uploads already use a presigned PUT URL the same way.
- Filename preservation on direct GET: set the object's `Content-Disposition`
  metadata (`setObjectEntityDownloadMetadata`) before signing — GCS returns it as
  a response header so the file keeps its original name instead of the storage
  UUID. Do this best-effort (don't fail the download if the metadata write fails).
- The Replit sidecar signing endpoint (`/object-storage/signed-object-url`) takes
  a fixed body (bucket_name, object_name, method, expires_at) and supports the GET
  method; it does not take a response-content-disposition override, which is why
  the disposition is set on the object metadata instead.

Keep auth on the endpoint that *issues* the URL (header password), not in the URL
itself, and keep the TTL short.
