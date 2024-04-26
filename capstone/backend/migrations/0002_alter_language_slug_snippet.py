# Generated by Django 4.2.10 on 2024-04-23 05:20

from django.db import migrations, models
import django.db.models.expressions


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='language',
            name='slug',
            field=models.CharField(blank=True, max_length=64, unique=True),
        ),
        migrations.CreateModel(
            name='Snippet',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=64)),
                ('code', models.TextField()),
                ('slug', models.CharField(max_length=64)),
                ('language', models.ForeignKey(on_delete=django.db.models.expressions.Case, related_name='codesnippet', to='backend.language')),
            ],
        ),
    ]