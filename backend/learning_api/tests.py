from datetime import date

from django.test import TestCase
from django.urls import reverse

from .models import AIChallenge


class LearningApiTests(TestCase):
    def test_health_reports_service_status(self):
        response = self.client.get(reverse('learning_api:health'))

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['status'], 'ok')

    def test_daily_challenge_is_public_and_date_scoped(self):
        response = self.client.get(reverse('learning_api:challenge'))
        payload = response.json()

        self.assertEqual(response.status_code, 200)
        self.assertEqual(payload['date'], date.today().isoformat())
        self.assertTrue(AIChallenge.objects.filter(pk=payload['id']).exists())
        self.assertIn('prompt', payload)
        self.assertNotIn('learner', payload)

    def test_challenge_offset_rotates_prompt(self):
        first = self.client.get(reverse('learning_api:challenge'), {'offset': 0}).json()
        next_item = self.client.get(reverse('learning_api:challenge'), {'offset': 1}).json()

        self.assertNotEqual(first['id'], next_item['id'])

    def test_invalid_offset_falls_back_to_first_challenge(self):
        response = self.client.get(reverse('learning_api:challenge'), {'offset': 'not-a-number'})

        self.assertEqual(response.status_code, 200)
        self.assertTrue(AIChallenge.objects.filter(pk=response.json()['id']).exists())

    def test_challenge_rejects_post_requests(self):
        response = self.client.post(reverse('learning_api:challenge'))

        self.assertEqual(response.status_code, 405)

    def test_no_active_challenges_returns_service_unavailable(self):
        AIChallenge.objects.update(is_active=False)

        response = self.client.get(reverse('learning_api:challenge'))

        self.assertEqual(response.status_code, 503)
