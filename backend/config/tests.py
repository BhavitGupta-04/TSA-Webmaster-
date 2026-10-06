import tempfile
from pathlib import Path

from django.test import SimpleTestCase, override_settings


class FrontendRoutingTests(SimpleTestCase):
    def setUp(self):
        self.temp_dir = tempfile.TemporaryDirectory()
        self.frontend_dir = Path(self.temp_dir.name)
        (self.frontend_dir / 'index.html').write_text('<main>Signal Lab</main>', encoding='utf-8')
        asset_dir = self.frontend_dir / 'assets'
        asset_dir.mkdir()
        (asset_dir / 'app.js').write_text('console.log("ready")', encoding='utf-8')
        self.settings_override = override_settings(FRONTEND_DIST_DIR=self.frontend_dir)
        self.settings_override.enable()

    def tearDown(self):
        self.settings_override.disable()
        self.temp_dir.cleanup()

    def test_root_and_client_routes_return_the_frontend(self):
        for route in ('/', '/learn', '/curriculum/module-one'):
            with self.subTest(route=route):
                response = self.client.get(route)
                self.assertEqual(response.status_code, 200)
                self.assertEqual(response['Content-Type'], 'text/html; charset=utf-8')
                self.assertContains(response, 'Signal Lab')

    def test_missing_asset_returns_not_found(self):
        response = self.client.get('/assets/missing.js')
        self.assertEqual(response.status_code, 404)

    def test_built_assets_are_served_from_the_site_root(self):
        response = self.client.get('/assets/app.js')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response['Content-Type'], 'text/javascript')
        self.assertContains(response, 'console.log("ready")')

    def test_asset_paths_cannot_escape_the_frontend_build(self):
        response = self.client.get('/%2e%2e/backend/manage.py')
        self.assertEqual(response.status_code, 404)
