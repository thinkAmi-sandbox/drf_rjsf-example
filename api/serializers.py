import json
import traceback
from copy import deepcopy

from django.conf import settings
from jsonschema.validators import Draft7Validator
from rest_framework import serializers

from diary.models import Diary


class DiarySerializer(serializers.ModelSerializer):
    BASE_JSON_SCHEMA_FILE_DIR = settings.BASE_DIR / 'frontend' / 'src' / 'jsonSchemas'

    def get_json_schema_file_name(self):
        if self.instance:
            return self.BASE_JSON_SCHEMA_FILE_DIR / f'diary_{self.instance.version}.json'
        return self.BASE_JSON_SCHEMA_FILE_DIR / f'diary_{settings.CURRENT_JSON_SCHEMA_VERSION}.json'

    def validate(self, attrs):
        with open(self.get_json_schema_file_name()) as f:
            json_schema = json.load(f)

        errors = Draft7Validator(json_schema).iter_errors(attrs)
        messages = [e.message for e in errors]

        if messages:
            raise serializers.ValidationError(messages)

        return attrs

    def create(self, validated_data):
        ModelClass = self.Meta.model

        target_data = deepcopy(validated_data)

        variety = validated_data['content'].get('variety')
        target_data['name'] = variety or validated_data['content']['name']
        target_data['version'] = settings.CURRENT_JSON_SCHEMA_VERSION

        try:
            instance = ModelClass._default_manager.create(**target_data)
        except TypeError:
            tb = traceback.format_exc()
            msg = (
                    'Got a `TypeError` when calling `%s.%s.create()`. '
                    'This may be because you have a writable field on the '
                    'serializer class that is not a valid argument to '
                    '`%s.%s.create()`. You may need to make the field '
                    'read-only, or override the %s.create() method to handle '
                    'this correctly.\nOriginal exception was:\n %s' %
                    (
                        ModelClass.__name__,
                        ModelClass._default_manager.name,
                        ModelClass.__name__,
                        ModelClass._default_manager.name,
                        self.__class__.__name__,
                        tb
                    )
            )

            raise TypeError(msg)

        return instance

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

            if attr == 'content':
                variety = value.get('variety')
                setattr(instance, 'name', variety or value['name'])

        instance.save()
        return instance

    class Meta:
        model = Diary
        fields = ['id', 'name', 'content', 'version', 'updated_at']
