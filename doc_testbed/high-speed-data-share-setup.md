# CADDEデータ提供・受信環境の構築(高速版)

<!-- omit in toc -->

## 0.前提

　ITDTのVPN上で、異なるIPアドレスを持つPCとUbuntuサーバを事前に準備する。PCはWebApp等のブラウザからのGUI操作、マシン(Ubuntu 22.04)にsshしてコネクタなどのコンポーネントをインストールする等のために使用する。

<img src="./images/standard-dev-env.png" alt="環境" width="60%"/>

　各CADDEサービスの名前解決用のDNSの設定は完了しているものとする。
以下は、CADDEユーザIDが`0001-koshizukalab`、サイト名が`koshizukalab`となる場合の例である。
(命名規則については、[CADDE命名規則](https://github.com/Koshizuka-lab/klab-connector-v4/blob/testbed/doc_testbed/domain_registration.md)を参照すること)

```txt
cadde-catalog-0001.koshizukalab.dataspace.internal => 10.250.3.132
cadde-provider-0001.koshizukalab.dataspace.internal => 10.250.3.132
cadde-authz-0001.koshizukalab.dataspace.internal => 10.250.3.132
cadde-consumer-0001.koshizukalab.dataspace.internal => 10.250.3.132
cadde-webapp-0001.koshizukalab.dataspace.internal => 10.250.3.132
```

作業ディレクトリは、ホームディレクトリ直下に作成された`~/cadde-testbed`とする。
```bash
$ mkdir ~/cadde_testbed && cd ~/cadde_testbed
$ export WORKDIR=$PWD
```

　[CADDEテストベッド用TLS証明書の取得方法](https://github.com/Koshizuka-lab/klab-connector-v4/blob/testbed/doc_testbed/certificate.md)に従って、UTokyo ITDT運営者に連絡を取り、秘密鍵(server.key)、サーバ証明書(server.crt、cacert.pem)を作成・取得する。それらを作業ディレクトリ下のサブディレクトリ`certs`に保存する。つまり、次のような状態になれば良い。
```
$ ls ${WORKDIR}/certs/
cacert.pem  server.crt  server.key
```
　続いて、CADDEのサービス群の設定を高速に行うためのスクリプト群をGitHubからクローンする。
```bash
cd ${WORKDIR}
git clone https://github.com/Koshizuka-lab/data-share-handson-scripts.git
```

## 1. コネクタと関連コンポーネントの一括インストール


　クローンしたリポジトリ`data-share-handson-scripts`にある環境変数設定用のファイル`config.env`を編集する。
```bash
cd ${WORKDIR}/data-share-handson-scripts
vim config.env 
```

　別途配布した「CADDEテストベッド利用情報」内にある【CADDEユーザアカウント/クライアント情報】を参考にして設定する。
以下の例はCADDEユーザIDを`0001-koshizukalab`、サイト名を`koshizukalab`としている場合の設定例である。

```dotenv
# CADDEユーザアカウント情報
CADDE_USER_ID=0001-koshizukalab
CADDE_USER_NUMBER=0001
SITE_NAME=koshizukalab
# クライアントID/シークレット情報
AUTHZ_CLIENT_ID=authz-0001-koshizukalab
AUTHZ_CLIENT_SECRET=XXXXXXXXXXXXXXXXXXXXXXX
CONSUMER_CLIENT_ID=consumer-0001-koshizukalab
CONSUMER_CLIENT_SECRET=YYYYYYYYYYYYYYYYYYYYYY
WEBAPP_CLIENT_ID=webapp-0001-koshizukalab
WEBAPP_CLIENT_SECRET=ZZZZZZZZZZZZZZZZZZZZZZ
# 作業ディレクトリ
WORKDIR=~/cadde_testbed
```

　最後に、各種コンポーネントのソースコードをリポジトリから一斉にクローンするため、以下のスクリプトを実行する。
```bash
cd ${WORKDIR}/data-share-handson-scripts
bash set-dirs.sh
```

　この結果、作業ディレクトリが以下のようになる。

```bash
$ ls ${WORKDIR}
certs  ckan-docker  data-share-handson-scripts  klab-connector-v4  private-http-server  ut-cadde_gui

```


　続いて、以下のスクリプトを実行し、CKAN、提供者コネクタ、認可サーバ、利用者コネクタ、WebApp、Private-HTTP-Serverを立ち上げる。

```bash
cd ${WORKDIR}/data-share-handson-scripts/set-containers
bash 7-all_set.sh
```

　途中に出てきた以下の設定項目を対話的に入力する。この設定は認可サーバと提供者コネクタを連携するための設定である。詳細は[認可機能の初期セットアップ](https://github.com/Koshizuka-lab/klab-connector-v4/blob/testbed/doc_testbed/provider.md#236-認可機能の初期セットアップ)を参照すること。

- **CADDEユーザID**
  - データ提供者のCADDEユーザID
- **提供者コネクタのクライアントID**
  - `settings.json`の`provider_connector_id`の値と一致させる（[認証機能との連携に関する設定](https://github.com/Koshizuka-lab/klab-connector-v4/blob/testbed/doc_testbed/provider.md#234-認証機能との連携に関する設定)を参照）
- **CADDE認証機能認証サーバのURL**
  - `settings.json`の`authn_keycloak_url`の値と一致させる（[認証機能との連携に関する設定](https://github.com/Koshizuka-lab/klab-connector-v4/blob/testbed/doc_testbed/provider.md#234-認証機能との連携に関する設定)を参照）

  
　以下に初期セットアップの実行例を示す。ここで、CADDEユーザIDは`0001-koshizukalab`、サイト名は`koshizukalab`としている。

```bash
CADDEユーザID: 0001-koshizukalab
提供者コネクタのクライアントID: provider-0001-koshizukalab
CADDE認証機能認証サーバのURL: https://cadde-authn.koshizukalab.dataspace.internal:18443/keycloak
```

　次のようなメッセージが出力されていれば、正常に初期セットアップが行われたこととなる。

```bash
〇レルム0001-koshizukalabの作成に成功しました
〇クライアントprovider-0001-koshizukalabの作成に成功しました
〇アイデンティティプロバイダーの作成に成功しました　Userinfo URL: https://cadde-authn.koshizukalab.dataspace.internal:18443/keycloak/realms/authentication/protocol/openid-connect/userinfo
```



## 2. 提供者コネクタと認可サーバの連携

#### 提供者コネクタクライアントシークレットの取得。
　最初に、起動した認可サーバにブラウザからアクセスする。
CADDEユーザIDが`0001-koshizukalab`の場合、`http://cadde-authz-0001.koshizukalab.dataspace.internal:5080`にアクセスする。
`ログイン`を押し、CADDEユーザIDとパスワードを入力する。
左側にある`認可機能の設定`をクリックすると、提供者コネクタのクライアントシークレットを確認できる。
認可機能のGUIについては、[認可機能の設定について](https://github.com/Koshizuka-lab/klab-connector-v4/blob/data-share-handson/doc_testbed/provider.md#33-認可の設定)を参考にすること。
上記手続きを経て、GUI上で以下のようなクライアントシークレットを確認できる。

```bash
提供者コネクタクライアントシークレット NzhWavWPz6ECbF09XekFzkkYCgopo9GN
```

#### 上記の`提供者コネクタクライアントシークレット`を`3-1-prov_authz_set.sh`のファイルに記載する。

　以下コマンドにより、ファイルを編集する。
```bash
cd ${WORKDIR}/data-share-handson-scripts/set-containers
vim 3-1-prov_authz_set.sh
```

　次の行に提供者コネクタクライアントシークレットを記載する。
例えば、提供者コネクタクライアントシークレットが`NzhWavWPz6ECbF09XekFzkkYCgopo9GN`である場合、次のようになる。

```bash
- PROVIDER_CLIENT_SECRET_BY_AUTHZ="<認可機能が発行したクライアントシークレット>"
+ PROVIDER_CLIENT_SECRET_BY_AUTHZ=NzhWavWPz6ECbF09XekFzkkYCgopo9GN
```

　ファイル編集後に次のスクリプトを実行すると、認可サーバと提供者コネクタの連携が設定された後、提供者コネクタの再起動まで行われる。

```bash
cd ${WORKDIR}/data-share-handson-scripts/set-containers
bash 3-1-prov_authz_set.sh
```

## 3. 最後に
　本手続きで以下のサービスがUbuntuマシンで稼働している状況となっている(CADDEユーザIDは`0001-koshizukalab`、サイト名は`koshizukalab`とする)。
- データ提供者コネクタ: cadde-provider-0001.koshizukalab.dataspace.internal:443
- データ提供者の管理するカタログサイト: cadde-catalog-0001.koshizukalab.dataspace.internal:8443
- データ提供者の管理する認可サーバ: cadde-authz-0001.koshizukalab.dataspace.internal:5080
- データ利用者コネクタ: cadde-consumer-0001.koshizukalab.dataspace.internal:1443
- データ利用者のWebApp: cadde-webapp-0001.koshizukalab.dataspace.internal:3000
- プライベートHTTPサーバ: localhost:8080


　以上により、データ交換を実行する前に必要なDockerコンテナに関して、全て稼働した状態となった。
続いて、ハンズオンで行った`authorized.txt`を、提供者コネクタから利用者コネクタを介してダウンロードする方法について説明する。
以下の手続きは[データ共有ハンズオン](https://github.com/Prismoid/klab-connector-v4/blob/main/doc_testbed/data-share-handson.md)で説明する。

- データファイルの配置
- データカタログの作成
- データの認可登録
- データの原本情報登録(来歴管理サーバ+カタログサイト)
- 提供者コネクタに対する設定
  - 提供データのリソースURLとアクセスポリシーの設定
  - データサーバのロケーションの設定(こちらは本手続き中で既に行っています)
  - 認可機能の追加設定(こちらは本手続き中で既に行っています)
  - 来歴管理機能の追加設定(こちらは本手続き中で既に行っています)
