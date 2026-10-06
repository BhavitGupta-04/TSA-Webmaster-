import mimetypes
from pathlib import Path

from django.conf import settings
from django.http import FileResponse, Http404


def frontend(_request, asset_path=''):
    root = Path(settings.FRONTEND_DIST_DIR).resolve()
    requested = (root / asset_path).resolve()

    if not requested.is_relative_to(root):
        raise Http404

    if requested.is_file():
        return FileResponse(
            requested.open('rb'),
            content_type=mimetypes.guess_type(requested.name)[0] or 'application/octet-stream',
        )

    if asset_path and Path(asset_path).suffix:
        raise Http404

    index = root / 'index.html'
    if not index.is_file():
        raise Http404

    return FileResponse(index.open('rb'), content_type='text/html; charset=utf-8')
