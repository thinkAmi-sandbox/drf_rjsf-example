from api.serializers import DiarySerializer


def test_JSONSchemaの仕様を満たす():
    input_data = {
        'content': {
            'name': '3文字',
            'note': '5文字です'
        }
    }

    serializer = DiarySerializer(data=input_data)
    assert serializer.is_valid()
    assert serializer.errors == {}


def test_nameが2文字():
    input_data = {
        'content': {
            'name': '2字',
            'note': '5文字です'
        }
    }

    serializer = DiarySerializer(data=input_data)
    assert serializer.is_valid() is False
    assert serializer.errors['non_field_errors'] == ["'2字' is too short"]


def test_noteが4文字():
    input_data = {
        'content': {
            'name': '3文字',
            'note': '4文字だ'
        }
    }

    serializer = DiarySerializer(data=input_data)
    assert serializer.is_valid() is False
    assert serializer.errors['non_field_errors'] == ["'4文字だ' is too short"]


def test_nameとnoteが短すぎる():
    input_data = {
        'content': {
            'name': '2字',
            'note': '4文字だ'
        }
    }

    serializer = DiarySerializer(data=input_data)
    assert serializer.is_valid() is False
    assert serializer.errors['non_field_errors'] == ["'2字' is too short", "'4文字だ' is too short"]


def test_nameとnoteが数字():
    input_data = {
        'content': {
            'name': 123,
            'note': 12345
        }
    }

    serializer = DiarySerializer(data=input_data)
    assert serializer.is_valid() is False
    assert serializer.errors['non_field_errors'] == ["123 is not of type 'string'", "12345 is not of type 'string'"]


def test_追加のプロパティが存在するためNG():
    input_data = {
        'content': {
            'name': '3文字',
            'note': '5文字です',
            'additional': '追加したデータ'
        }
    }

    serializer = DiarySerializer(data=input_data)
    assert serializer.is_valid() is False
    assert serializer.errors['non_field_errors'] \
           == ["Additional properties are not allowed ('additional' was unexpected)"]
