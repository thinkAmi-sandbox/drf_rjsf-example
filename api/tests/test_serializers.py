import pytest

from api.serializers import DiarySerializer


class TestVersion20231224:
    @pytest.fixture
    def version(self, settings):
        settings.CURRENT_JSON_SCHEMA_VERSION = '2023_1224'

    def test_JSONSchemaの仕様を満たす(self, version):
        input_data = {
            'content': {
                'name': '3文字',
                'note': '5文字です'
            }
        }

        serializer = DiarySerializer(data=input_data)
        assert serializer.is_valid()
        assert serializer.errors == {}

    def test_nameが2文字(self, version):
        input_data = {
            'content': {
                'name': '2字',
                'note': '5文字です'
            }
        }

        serializer = DiarySerializer(data=input_data)
        assert serializer.is_valid() is False
        assert serializer.errors['non_field_errors'] == ["'2字' is too short"]

    def test_noteが4文字(self, version):
        input_data = {
            'content': {
                'name': '3文字',
                'note': '4文字だ'
            }
        }

        serializer = DiarySerializer(data=input_data)
        assert serializer.is_valid() is False
        assert serializer.errors['non_field_errors'] == ["'4文字だ' is too short"]

    def test_nameとnoteが短すぎる(self, version):
        input_data = {
            'content': {
                'name': '2字',
                'note': '4文字だ'
            }
        }

        serializer = DiarySerializer(data=input_data)
        assert serializer.is_valid() is False
        assert serializer.errors['non_field_errors'] == ["'2字' is too short", "'4文字だ' is too short"]

    def test_nameとnoteが数字(self, version):
        input_data = {
            'content': {
                'name': 123,
                'note': 12345
            }
        }

        serializer = DiarySerializer(data=input_data)
        assert serializer.is_valid() is False
        assert serializer.errors['non_field_errors'] == ["123 is not of type 'string'", "12345 is not of type 'string'"]

    def test_追加のプロパティが存在するためNG(self, version):
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


class TestVersion20231225:
    @pytest.fixture
    def version(self, settings):
        settings.CURRENT_JSON_SCHEMA_VERSION = '2023_1225'

    def test_黄色のシナノゴールドで仕様を満たす(self, version):
        input_data = {
            'content': {
                'color': '黄',
                'name': 'シナノゴールド',
                'note': 'おいしいです'
            }
        }

        serializer = DiarySerializer(data=input_data)
        assert serializer.is_valid()
        assert serializer.errors == {}

    def test_緑色のブラムリーで仕様を満たす(self, version):
        input_data = {
            'content': {
                'color': '緑',
                'name': 'ブラムリー',
                'note': 'おいしいです'
            }
        }

        serializer = DiarySerializer(data=input_data)
        assert serializer.is_valid()
        assert serializer.errors == {}

    def test_赤色の秋映で仕様を満たす(self, version):
        input_data = {
            'content': {
                'color': '赤',
                'name': '秋映',
                'note': 'おいしいです'
            }
        }

        serializer = DiarySerializer(data=input_data)
        assert serializer.is_valid()
        assert serializer.errors == {}


    def test_赤色のその他の名前で仕様を満たす(self, version):
        input_data = {
            'content': {
                'color': '赤',
                'name': 'その他',
                'variety': '奥州ロマン',
                'note': 'おいしいです'
            }
        }

        serializer = DiarySerializer(data=input_data)
        assert serializer.is_valid()
        assert serializer.errors == {}


    def test_色と名前が不一致(self, version):
        input_data = {
            'content': {
                'color': '赤',
                'name': 'シナノゴールド',
                'note': 'おいしいです'
            }
        }

        serializer = DiarySerializer(data=input_data)
        assert serializer.is_valid() is False
        assert serializer.errors['non_field_errors'] == \
               ["{'color': '赤', 'name': 'シナノゴールド', 'note': 'おいしいです'} is not valid under any of the given schemas"]

    def test_色が存在しない(self, version):
        input_data = {
            'content': {
                'color': '青',
                'name': 'その他',
                'variety': 'ブルーロマン',
                'note': 'おいしいです'
            }
        }

        serializer = DiarySerializer(data=input_data)
        assert serializer.is_valid() is False
        assert serializer.errors['non_field_errors'] == \
               [
                   "'青' is not valid under any of the given schemas",
                   "{'color': '青', 'name': 'その他', 'variety': 'ブルーロマン', 'note': 'おいしいです'} is not valid under any of the given schemas"
               ]

    def test_その他の時にvarietyがない(self, version):
        input_data = {
            'content': {
                'color': '赤',
                'name': 'その他',
                'note': 'おいしいです'
            }
        }

        serializer = DiarySerializer(data=input_data)
        assert serializer.is_valid() is False
        assert serializer.errors['non_field_errors'] == ["'variety' is a required property"]

    def test_その他でない時にvarietyがある(self, version):
        input_data = {
            'content': {
                'color': '赤',
                'name': '秋映',
                'note': 'おいしいです',
                'variety': 'シナノスイート'
            }
        }

        serializer = DiarySerializer(data=input_data)
        assert serializer.is_valid() is False
        assert serializer.errors['non_field_errors'] \
               == ["{'color': '赤', 'name': '秋映', 'note': 'おいしいです', 'variety': 'シナノスイート'} should not be valid under {'required': ['variety']}"]
