from datetime import date

from django.http import JsonResponse
from django.views.decorators.http import require_GET
from .models import AIChallenge


@require_GET
def health(_request):
    return JsonResponse({'status': 'ok', 'service': 'Signal Lab learning API', 'version': 1})


@require_GET
def challenge(request):
    try:
        offset = max(0, int(request.GET.get('offset', '0')))
    except (TypeError, ValueError):
        offset = 0

    challenges = list(AIChallenge.objects.filter(is_active=True))
    if not challenges:
        return JsonResponse({'detail': 'No active field challenges are available.'}, status=503)

    index = (date.today().toordinal() + offset) % len(challenges)
    current = challenges[index]
    response = JsonResponse({
        'id': str(current.pk),
        'topic': current.topic,
        'title': current.title,
        'prompt': current.prompt,
        'hint': current.hint,
        'date': date.today().isoformat(),
    })
    response['Cache-Control'] = 'public, max-age=3600'
    return response
