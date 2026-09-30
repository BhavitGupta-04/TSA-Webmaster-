from django.db import migrations, models


def add_starter_challenges(apps, schema_editor):
    Challenge = apps.get_model('learning_api', 'AIChallenge')
    Challenge.objects.bulk_create([
        Challenge(
            topic='CHECK THE EVIDENCE',
            title='The confident answer',
            prompt='An AI gives your lab group a confident explanation and one source. What would you check before using it?',
            hint='Open the original source and compare its evidence with the claim.',
        ),
        Challenge(
            topic='PROMPT WITH PURPOSE',
            title='The hint, not the answer',
            prompt='Rewrite “help me with algebra” so an AI gives you one useful hint at a time instead of doing the problem for you.',
            hint='Include the topic, your level, and what you want the tool to do after each hint.',
        ),
        Challenge(
            topic='LOOK FOR FAIRNESS',
            title='Who is missing?',
            prompt='A speech tool works well for most of your class but struggles with some accents. What examples would you add to test it fairly?',
            hint='Think about who uses the tool and whose speech may be missing from its examples.',
        ),
        Challenge(
            topic='PROTECT PRIVACY',
            title='Make a safe demo',
            prompt='Your team needs sample student data to demonstrate a study planner. How can you create a useful demo without exposing anyone’s details?',
            hint='Use fictional or anonymized details and include only what the demo actually needs.',
        ),
        Challenge(
            topic='KEEP YOUR OWN VOICE',
            title='From AI draft to your work',
            prompt='An AI suggests three poster headlines for your club. What steps would make the final design genuinely yours and trustworthy?',
            hint='Choose using your own brief, revise the idea, verify facts, and be transparent about assistance.',
        ),
    ])


def remove_starter_challenges(apps, schema_editor):
    Challenge = apps.get_model('learning_api', 'AIChallenge')
    Challenge.objects.all().delete()


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name='AIChallenge',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('topic', models.CharField(max_length=80)),
                ('title', models.CharField(max_length=120)),
                ('prompt', models.TextField()),
                ('hint', models.TextField()),
                ('is_active', models.BooleanField(default=True)),
            ],
            options={
                'verbose_name': 'AI field challenge',
                'verbose_name_plural': 'AI field challenges',
                'ordering': ['id'],
            },
        ),
        migrations.RunPython(add_starter_challenges, remove_starter_challenges),
    ]
