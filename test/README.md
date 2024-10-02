# 検証用
UT-CADDEの動作検証用のコードを置く。ちょっとしたスクリプトはこのファイルにメモしておく。

## 検証スクリプト
### 利用者コネクタ→ckan横断検索
```sh
curl -v -X GET "http://172.26.16.20:80/cadde/api/v4/catalog?q={検索したい文字列}" -s -S -H "Cache-Control: no-cache" -H "x-cadde-search: meta"
```
でjsonが返ってくれば成功

### 利用者コネクタ→提供者コネクタ→google driveでデータ取得
越塚研ネットワーク内から適当なPCの適当なdirに移動して
```sh
curl -v -X GET "http://172.26.16.20:80/cadde/api/v4/file" -s -S -H "Cache-Control: no-cache" -H "x-cadde-resource-url: https://drive.google.com/uc?export=download&id=17fJYOFpEkfTDaAFS96e1_X9JNubsl3t2" -H "x-cadde-resource-api-type: file/http" -H "x-cadde-provider: test_provider_id" -o cadde_output.txt
```
dir内にcadde_output.txtというファイルが生成され、
```
hello, data space!
```
と中身に書いてあれば成功

## 各シェルスクリプトファイルについて
- `.env`: アクセス先URLやAPIエンドポイント, ルート証明書の位置など各シェルスクリプトで共通で使用する変数をまとめたファイル
- `user_authentication.sh`: CADDE利用者認証機能の検証用スクリプト
- `catalog_search_meta.sh`: 横断検索機能の検証用スクリプト
- `catalog_search_detail.sh`: 詳細検索機能の検証用スクリプト
- `data_exchange_http.sh`: HTTPによるファイル交換機能の検証用スクリプト
