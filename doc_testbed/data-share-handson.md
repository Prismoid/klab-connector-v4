# CADDEテストベッド データ共有ハンズオン

<!-- omit in toc -->

## 0. 前提

　[データ共有環境の構築(高速版)](https://github.com/Prismoid/klab-connector-v4/blob/main/doc_testbed/high-speed-data-share-setup.md)を完了させている。



## 1. CADDEでデータを提供する
　本ハンズオンでは`authorized.txt`というファイルを、提供者が管理するプライベートHTTPデータサーバから、提供者コネクタを経由して利用者コネクタで取得し、WebAppからダウンロードする一連の手続きを説明する。

### 1.1 データサーバへのファイルの配置。
　ファイルを共有したい場合、ディレクトリ`${WORKDIR}/private-http-server/data`にデータを保存しておけば良い。
例えば、テキストファイル`authorized.txt`を保存したい場合は、以下のようになっていれば良い。

```bash
$ ls ${WORKDIR}/private-http-server/data/
authorized.txt  unauthorized.txt
```
　※ 上記、2ファイルは[データ共有環境の構築(高速版)](https://github.com/Prismoid/klab-connector-v4/blob/main/doc_testbed/high-speed-data-share-setup.md)を実行すると、デフォルトで保存されている。

また、データファイルのリソースURLは`http://data-management.<サイト名>.internal:8080/<ファイル名>`となっている。TXTファイルでなくCSV等の別の拡張子にしても問題ない。
例えば、`authorized.txt`を指し示すリソースURLは、サイト名が`koshizukalab`ならば、

```txt
http://data-management.koshizukalab.internal:8080/authorized.txt
```
　である。このリソースURLをキーとして、カタログ作成や認可登録を行い、提供者コネクタとの連携を行う。



### 1.2. データカタログの作成

　カタログは提供者カタログサイトにアクセスし、設定を行う。
[データ共有環境の構築(高速版)](https://github.com/Prismoid/klab-connector-v4/blob/main/doc_testbed/high-speed-data-share-setup.md)を終えている場合、以下のURLにブラウザから接続することで、
データ提供者の管理するカタログサイト(CKAN)に接続できる。

```txt
https://cadde-catalog-<ユーザシリアル番号>.<サイト名>.dataspace.internal:8443
```
　例えば、CADDEユーザID`0001-koshizukalab`であれば、以下のURLに接続すればよい。
```txt
https://cadde-catalog-0001.koshizukalab.dataspace.internal:8443
```

### 1.2.1 CKANサイトでアカウントを作成し、`CKAN_API_KEY`を取得する。
　[CKANの初期設定](https://github.com/Koshizuka-lab/klab-connector-v4/blob/testbed/doc_testbed/provider.md#212-ckanの初期設定)を参考にアカウントを作成する。

上記スクリプトを実行した場合、CKAN管理者アカウントは以下で設定されている。
```
管理者アカウント -> ckan_admin
パスワード -> test1234
```

ユーザ登録を完了した後、`CKAN_API_KEY`を取得したら、以下のディレクトリのファイル`data_reg_config.env`に記述しておく。

```bash
$ cd ${WORKDIR}/data-share-handson/1-reg-new-data
$ ls .
0-reg_authorized_data.sh  1-check_history_of_data.sh  data-reg-config.env
```

### 1.2.2 データカタログの作成

　[データカタログの作成](https://github.com/Koshizuka-lab/klab-connector-v4/blob/data-share-handson/doc_testbed/provider.md#32-データカタログの作成)を参考にする。


　変更及び設定が必要な項目は以下であることに注意する。
 - `Title`、`Visibility`、2種類の`Custom Field` (最初の画面)
 - `リソースURL`、`Name` (次の画面)

　データカタログを作成した後の画面で、「Data and Resources」下のファイル名をクリックする。
Additional Informationの下のShow moreをクリックし、IDを確認する。
このIDは、以下ディレクトリのファイル`data_reg_config.env`に記述しておく。

```bash
$ cd ${WORKDIR}/data-share-handson/1-reg-new-data/
$ ls .
0-reg_authorized_data.sh  1-check_history_of_data.sh  data-reg-config.env
```




### 1.3. データ原本情報の登録(来歴管理サーバ、及び提供者カタログサイト)

　`${WORKDIR}/data-share-handson/data-reg-config.env`に、提供したいデータの`ファイル名`、`CKAN_API_KEY`、`カタログ作成時に確認したデータID`を記入する。
例えば、`authorized.txt`を登録しようとした場合、次のようなファイルとなる。

```txt
# ~/cadde_testbed/private-http-server/dataに保存した、提供データのファイル名
FILENAME=authorized.txt

# CKANのAPIキー(CKANサイトから取得)
CKAN_API_KEY=<CKAN APIキー>

# データカタログに登録されたデータのID(CKANサイトから取得)
DATA_ID=<リソースID>
```

　上記、環境変数用の設定ファイルが正しく登録されていることを確認した後、ディレクトリを移動し、次のスクリプトを実行する。

```bash
cd ${WORKDIR}/data-share-handson-scripts/1-reg-new-data/
bash 0-reg_authorized_data.sh
```

　`suceess`の欄がtrueとなっているJSONが表示された場合、成功である。

　また、この手続きの際にプライベートサーバへのリンクを、提供者コネクタの認可、来歴等の設定ファイル(json)に追加している。
例えば、`authorized.txt`ファイルを提供する場合、`${WORKDIR}/klab-connector-v4/src/provider/connector-main/swagger_server/configs/http.json`のJSONファイルに、
`http://data-management.${SITE_NAME}.internal:8080/authorized.txt`といったリソースURLを値として持つオブジェクトが追加される。

### 1.4. 認可サーバでの認可設定

　`http://cadde-authz-<ユーザシリアル番号>.<SITENAME>.dataspace.internal:5080`にアクセスし、[認可の設定](https://github.com/Koshizuka-lab/klab-connector-v4/blob/testbed/doc_testbed/provider.md#33-認可の設定)を参考に設定を行う。
例えば、CADDEユーザIDが`0001-koshizukalab`の場合、`http://cadde-authz-0001.koshizukalab.dataspace.internal:5080`にアクセスすることで、設定を行える。
提供するデータファイルが`authorized.txt`の場合、認可設定時のリソースURLは`http://data-management.${SITE_NAME}.internal:8080/authorized.txt`となる。


---

### 1.5. CADDEでデータを取得する

　[CADDEでデータを取得する](https://github.com/Koshizuka-lab/klab-connector-v4/blob/testbed/doc_testbed/handson.md#4-caddeでデータを取得する)を参考にWebAppからデータを取得する。

CADDEユーザIDが`0001-koshizukalab`の場合、WebAppのURLは`http://cadde-webapp-0001.koshizukalab.dataspace.internal:3000`となっている。
また、CADDEユーザID/Passwordでログイン後に、最初に入力するコネクタのURLは`https://cadde-consumer-0001.koshizukalab.dataspace.internal:443`となっている。


### 1.6. CADDE上のデータの来歴を確認する



## 2. 各種コンテナの停止について

　稼働しているコンテナ群は主に6つに分類される。
提供者コネクタ、提供者カタログサイト、提供者認可サーバ、利用者コネクタ、WebApp、プライベートHTTPサーバである。
これらの稼働と停止方法については、[データ共有環境の構築](https://github.com/Prismoid/klab-connector-v4/blob/main/doc_testbed/data-share-setup.md)に記載しているため、参考にすること。