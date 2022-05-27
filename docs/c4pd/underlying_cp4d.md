---
sidebar_position: 1
---

# Underlying C4PD

## Openshift 

#### nodes
```
[root@bastion ~]# oc get node
NAME                  STATUS   ROLES    AGE     VERSION
master01.js.ocp.adl   Ready    master   3d20h   v1.19.14+fcff70a
master02.js.ocp.adl   Ready    master   3d20h   v1.19.14+fcff70a
master03.js.ocp.adl   Ready    master   3d20h   v1.19.14+fcff70a
worker01.js.ocp.adl   Ready    worker   3d19h   v1.19.14+fcff70a
worker02.js.ocp.adl   Ready    worker   3d19h   v1.19.14+fcff70a
worker03.js.ocp.adl   Ready    worker   3d19h   v1.19.14+fcff70a
```


#### Resources 
```
[root@bastion ~]# oc get all
NAME                                                             READY   STATUS      RESTARTS   AGE
pod/c-db2oltp-1652327406348200-db2u-0                            1/1     Running     0          22h
pod/c-db2oltp-1652327406348200-etcd-0                            1/1     Running     0          22h
pod/c-db2oltp-1652327406348200-instdb-bc7ck                      0/1     Completed   0          22h
pod/c-db2oltp-1652327406348200-restore-morph-gqzg7               0/1     Completed   0          22h
pod/c-ibm-dmc-1652329764322098-redis-m-0                         4/4     Running     0          21h
pod/c-ibm-dmc-1652329764322098-redis-m-1                         4/4     Running     0          21h
pod/c-ibm-dmc-1652329764322098-redis-m-2                         4/4     Running     0          21h
pod/c-ibm-dmc-1652329764322098-redis-s-0                         4/4     Running     0          21h
pod/c-ibm-dmc-1652329764322098-redis-s-1                         4/4     Running     0          21h
pod/c-ibm-dmc-1652329764322098-redis-s-2                         4/4     Running     1          21h
pod/create-secrets-job-z9ngw                                     0/1     Completed   0          25h
pod/diagnostics-cronjob-1652408400-cnhlv                         0/1     Completed   0          88s
pod/dsx-influxdb-0                                               1/1     Running     0          25h
pod/dsx-influxdb-set-auth-kw5bm                                  0/1     Completed   0          25h
pod/ibm-dmc-1652329764322098-admin-857cf6499d-nz66h              1/1     Running     0          21h
pod/ibm-dmc-1652329764322098-admin-857cf6499d-vqp6v              1/1     Running     0          21h
pod/ibm-dmc-1652329764322098-dbapi-5495cd9bf8-hhph5              1/1     Running     0          21h
pod/ibm-dmc-1652329764322098-dbapi-5495cd9bf8-qs652              1/1     Running     0          21h
pod/ibm-dmc-1652329764322098-explain-58cf5d8f64-hdmpb            1/1     Running     0          21h
pod/ibm-dmc-1652329764322098-explain-58cf5d8f64-hr5hd            1/1     Running     0          21h
pod/ibm-dmc-1652329764322098-job-scheduler-594fd4ff8b-b7jsx      1/1     Running     0          21h
pod/ibm-dmc-1652329764322098-monitor-0                           1/1     Running     0          21h
pod/ibm-dmc-1652329764322098-nginx-6cbdc7d65c-bq7rr              1/1     Running     0          21h
pod/ibm-dmc-1652329764322098-nginx-6cbdc7d65c-r2cbd              1/1     Running     0          21h
pod/ibm-dmc-1652329764322098-registry-manager-68798b4895-bnztw   1/1     Running     0          21h
pod/ibm-dmc-1652329764322098-runsql-56bcbdd89b-ks9jz             1/1     Running     0          21h
pod/ibm-dmc-addon-api-7f46486979-jhfqg                           1/1     Running     0          22h
pod/ibm-dmc-addon-ui-55b8c9965-mrt9h                             1/1     Running     0          21h
pod/ibm-nginx-fcddfb5c6-qktcg                                    1/1     Running     0          25h
pod/ibm-nginx-fcddfb5c6-svtjx                                    1/1     Running     0          25h
pod/setup-nginx-job-zcvrs                                        0/1     Completed   0          25h
pod/usermgmt-5748699bc6-76vqg                                    1/1     Running     0          25h
pod/usermgmt-5748699bc6-xx2zr                                    1/1     Running     0          25h
pod/watchdog-alert-monitoring-cronjob-1652408400-s5h42           0/1     Completed   0          88s
pod/zen-audit-79479cd479-wgp5f                                   1/1     Running     0          25h
pod/zen-core-747456bd4d-d89p6                                    1/1     Running     0          25h
pod/zen-core-747456bd4d-mngr6                                    1/1     Running     0          25h
pod/zen-core-api-6bbd4f4d5d-knlp6                                1/1     Running     0          25h
pod/zen-core-api-6bbd4f4d5d-mlbk5                                1/1     Running     0          25h
pod/zen-data-sorcerer-d8db6499-sgsng                             1/1     Running     0          25h
pod/zen-database-core-57999565b-csd5c                            1/1     Running     0          22h
pod/zen-databases-5d9c5cc65f-n228m                               1/1     Running     0          22h
pod/zen-databases-5d9c5cc65f-pj7vw                               1/1     Running     0          22h
pod/zen-metastoredb-0                                            1/1     Running     0          25h
pod/zen-metastoredb-1                                            1/1     Running     0          25h
pod/zen-metastoredb-2                                            1/1     Running     0          25h
pod/zen-metastoredb-certs-9dtw7                                  0/1     Completed   0          25h
pod/zen-metastoredb-init-rzz5n                                   0/1     Completed   0          25h
pod/zen-post-requisite-job-rht5b                                 0/1     Completed   0          25h
pod/zen-pre-requisite-job-rfpt8                                  0/1     Completed   0          25h
pod/zen-watchdog-7d4cf9cd89-zt2dn                                1/1     Running     0          25h
pod/zen-watchdog-cronjob-1652408400-jc89p                        0/1     Completed   0          88s
pod/zen-watchdog-post-requisite-job-wd8nn                        0/1     Completed   0          25h
pod/zen-watcher-5f84488b98-t6pl6                                 1/1     Running     1          25h

NAME                                                 TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)                                                                           AGE
service/c-db2oltp-1652327406348200-db2u              ClusterIP   136.32.208.156   <none>        50000/TCP,50001/TCP,25000/TCP,25001/TCP,25002/TCP,25003/TCP,25004/TCP,25005/TCP   22h
service/c-db2oltp-1652327406348200-db2u-engn-svc     NodePort    136.32.74.36     <none>        50000:30257/TCP,50001:31757/TCP                                                   22h
service/c-db2oltp-1652327406348200-db2u-internal     ClusterIP   None             <none>        50000/TCP,9443/TCP,50052/TCP                                                      22h
service/c-db2oltp-1652327406348200-etcd              ClusterIP   None             <none>        2379/TCP,2380/TCP                                                                 22h
service/c-ibm-dmc-1652329764322098-redis-m           ClusterIP   None             <none>        15000/TCP,16000/TCP                                                               21h
service/c-ibm-dmc-1652329764322098-redis-m-metrics   ClusterIP   None             <none>        9000/TCP                                                                          21h
service/c-ibm-dmc-1652329764322098-redis-p           ClusterIP   None             <none>        16000/TCP                                                                         21h
service/c-ibm-dmc-1652329764322098-redis-s           ClusterIP   None             <none>        26379/TCP,15000/TCP,9000/TCP                                                      21h
service/database-core-svc                            ClusterIP   136.32.123.169   <none>        3023/TCP,3025/TCP                                                                 22h
service/dsx-influxdb                                 ClusterIP   136.32.20.166    <none>        8086/TCP                                                                          25h
service/ibm-dmc-1652329764322098-admin               ClusterIP   136.32.241.194   <none>        8443/TCP                                                                          21h
service/ibm-dmc-1652329764322098-dbapi               ClusterIP   136.32.245.71    <none>        8443/TCP                                                                          21h
service/ibm-dmc-1652329764322098-explain             ClusterIP   136.32.82.201    <none>        8443/TCP                                                                          21h
service/ibm-dmc-1652329764322098-job-scheduler       ClusterIP   136.32.0.107     <none>        8443/TCP                                                                          21h
service/ibm-dmc-1652329764322098-monitor             ClusterIP   136.32.235.211   <none>        8443/TCP                                                                          21h
service/ibm-dmc-1652329764322098-monitor-stateful    ClusterIP   None             <none>        8443/TCP                                                                          21h
service/ibm-dmc-1652329764322098-nginx               ClusterIP   136.32.25.142    <none>        8443/TCP                                                                          21h
service/ibm-dmc-1652329764322098-registry-manager    ClusterIP   136.32.222.79    <none>        8443/TCP                                                                          21h
service/ibm-dmc-1652329764322098-runsql              ClusterIP   136.32.84.132    <none>        8443/TCP                                                                          21h
service/ibm-dmc-addon-api                            ClusterIP   136.32.232.141   <none>        5555/TCP,4444/TCP                                                                 22h
service/ibm-dmc-addon-ui                             ClusterIP   136.32.158.103   <none>        8080/TCP,8443/TCP                                                                 21h
service/ibm-nginx-svc                                ClusterIP   136.32.119.23    <none>        443/TCP                                                                           25h
service/internal-nginx-svc                           ClusterIP   136.32.124.17    <none>        12443/TCP,12080/TCP                                                               25h
service/usermgmt-svc                                 ClusterIP   136.32.38.34     <none>        8080/TCP,3443/TCP                                                                 25h
service/zen-audit-svc                                ClusterIP   136.32.98.75     <none>        9880/TCP,9890/TCP,5140/TCP                                                        25h
service/zen-core-api-svc                             ClusterIP   136.32.166.171   <none>        3333/TCP,4444/TCP                                                                 25h
service/zen-core-svc                                 ClusterIP   136.32.151.208   <none>        3003/TCP,3443/TCP                                                                 25h
service/zen-data-sorcerer-svc                        ClusterIP   136.32.49.193    <none>        2222/TCP                                                                          25h
service/zen-databases-svc                            ClusterIP   136.32.136.28    <none>        3004/TCP                                                                          22h
service/zen-metastoredb                              ClusterIP   None             <none>        26257/TCP,8080/TCP                                                                25h
service/zen-metastoredb-public                       ClusterIP   136.32.16.184    <none>        26257/TCP,8080/TCP                                                                25h
service/zen-watchdog-svc                             ClusterIP   136.32.255.93    <none>        3333/TCP,4444/TCP                                                                 25h

NAME                                                        READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/ibm-dmc-1652329764322098-admin              2/2     2            2           21h
deployment.apps/ibm-dmc-1652329764322098-dbapi              2/2     2            2           21h
deployment.apps/ibm-dmc-1652329764322098-explain            2/2     2            2           21h
deployment.apps/ibm-dmc-1652329764322098-job-scheduler      1/1     1            1           21h
deployment.apps/ibm-dmc-1652329764322098-nginx              2/2     2            2           21h
deployment.apps/ibm-dmc-1652329764322098-registry-manager   1/1     1            1           21h
deployment.apps/ibm-dmc-1652329764322098-runsql             1/1     1            1           21h
deployment.apps/ibm-dmc-addon-api                           1/1     1            1           22h
deployment.apps/ibm-dmc-addon-ui                            1/1     1            1           21h
deployment.apps/ibm-nginx                                   2/2     2            2           25h
deployment.apps/usermgmt                                    2/2     2            2           25h
deployment.apps/zen-audit                                   1/1     1            1           25h
deployment.apps/zen-core                                    2/2     2            2           25h
deployment.apps/zen-core-api                                2/2     2            2           25h
deployment.apps/zen-data-sorcerer                           1/1     1            1           25h
deployment.apps/zen-database-core                           1/1     1            1           22h
deployment.apps/zen-databases                               2/2     2            2           22h
deployment.apps/zen-watchdog                                1/1     1            1           25h
deployment.apps/zen-watcher                                 1/1     1            1           25h

NAME                                                                   DESIRED   CURRENT   READY   AGE
replicaset.apps/ibm-dmc-1652329764322098-admin-857cf6499d              2         2         2       21h
replicaset.apps/ibm-dmc-1652329764322098-dbapi-5495cd9bf8              2         2         2       21h
replicaset.apps/ibm-dmc-1652329764322098-explain-58cf5d8f64            2         2         2       21h
replicaset.apps/ibm-dmc-1652329764322098-job-scheduler-594fd4ff8b      1         1         1       21h
replicaset.apps/ibm-dmc-1652329764322098-nginx-6cbdc7d65c              2         2         2       21h
replicaset.apps/ibm-dmc-1652329764322098-registry-manager-68798b4895   1         1         1       21h
replicaset.apps/ibm-dmc-1652329764322098-runsql-56bcbdd89b             1         1         1       21h
replicaset.apps/ibm-dmc-addon-api-7f46486979                           1         1         1       22h
replicaset.apps/ibm-dmc-addon-ui-55b8c9965                             1         1         1       21h
replicaset.apps/ibm-nginx-fcddfb5c6                                    2         2         2       25h
replicaset.apps/usermgmt-5748699bc6                                    2         2         2       25h
replicaset.apps/zen-audit-79479cd479                                   1         1         1       25h
replicaset.apps/zen-core-747456bd4d                                    2         2         2       25h
replicaset.apps/zen-core-api-6bbd4f4d5d                                2         2         2       25h
replicaset.apps/zen-data-sorcerer-d8db6499                             1         1         1       25h
replicaset.apps/zen-database-core-57999565b                            1         1         1       22h
replicaset.apps/zen-databases-5d9c5cc65f                               2         2         2       22h
replicaset.apps/zen-watchdog-7d4cf9cd89                                1         1         1       25h
replicaset.apps/zen-watcher-5f84488b98                                 1         1         1       25h

NAME                                                  READY   AGE
statefulset.apps/c-db2oltp-1652327406348200-db2u      1/1     22h
statefulset.apps/c-db2oltp-1652327406348200-etcd      1/1     22h
statefulset.apps/c-ibm-dmc-1652329764322098-redis-m   3/3     21h
statefulset.apps/c-ibm-dmc-1652329764322098-redis-s   3/3     21h
statefulset.apps/dsx-influxdb                         1/1     25h
statefulset.apps/ibm-dmc-1652329764322098-monitor     1/1     21h
statefulset.apps/zen-metastoredb                      3/3     25h

NAME                                                     COMPLETIONS   DURATION   AGE
job.batch/c-db2oltp-1652327406348200-instdb              1/1           2m37s      22h
job.batch/c-db2oltp-1652327406348200-restore-morph       1/1           8m37s      22h
job.batch/create-secrets-job                             1/1           47s        25h
job.batch/diagnostics-cronjob-1652408400                 1/1           11s        88s
job.batch/dsx-influxdb-set-auth                          1/1           48s        25h
job.batch/setup-nginx-job                                1/1           27s        25h
job.batch/watchdog-alert-monitoring-cronjob-1652408400   1/1           12s        88s
job.batch/zen-metastoredb-certs                          1/1           84s        25h
job.batch/zen-metastoredb-init                           1/1           70s        25h
job.batch/zen-post-requisite-job                         1/1           9s         25h
job.batch/zen-pre-requisite-job                          1/1           49s        25h
job.batch/zen-watchdog-cronjob-1652408400                1/1           9s         88s
job.batch/zen-watchdog-post-requisite-job                1/1           36s        25h

NAME                                              SCHEDULE       SUSPEND   ACTIVE   LAST SCHEDULE   AGE
cronjob.batch/diagnostics-cronjob                 */10 * * * *   False     0        89s             25h
cronjob.batch/usermgmt-ldap-sync-cron-job         */20 * * * *   True      0        <none>          25h
cronjob.batch/watchdog-alert-monitoring-cronjob   */10 * * * *   False     0        89s             25h
cronjob.batch/zen-watchdog-cronjob                */10 * * * *   False     0        89s             25h

NAME                           HOST/PORT                   PATH   SERVICES        PORT                   TERMINATION            WILDCARD
route.route.openshift.io/cpd   cpd-sandy.apps.js.ocp.adl          ibm-nginx-svc   ibm-nginx-https-port   passthrough/Redirect   None
```

## Getting into DB2 pod

```
[root@bastion ~]# oc get pods |grep db2u
c-db2oltp-1652327406348200-db2u-0                            1/1     Running     0          22h
[root@bastion ~]# oc rsh c-db2oltp-1652327406348200-db2u-0
sh-4.4$ hostname
c-db2oltp-1652327406348200-db2u-0
sh-4.4$ whoami
db2uadm
sh-4.4$ su - db2inst1
Last login: Fri May 13 02:25:04 UTC 2022
[db2inst1@c-db2oltp-1652327406348200-db2u-0 - Db2U db2inst1]$ db2level 
DB21085I  This instance or install (instance name, where applicable: 
"db2inst1") uses "64" bits and DB2 code release "SQL11057" with level 
identifier "0608010F".
Informational tokens are "DB2 v11.5.7.0", "s2204061704", "DYN2204061704AMD64", 
and Fix Pack "0".
Product is installed at "/opt/ibm/db2/V11.5.0.0".

[db2inst1@c-db2oltp-1652327406348200-db2u-0 - Db2U db2inst1]$ db2 list db directory

 System Database Directory

 Number of entries in the directory = 1

Database 1 entry:

 Database alias                       = BLUDB
 Database name                        = BLUDB
 Local database directory             = /mnt/blumeta0/db2/databases
 Database release level               = 15.00
 Comment                              =
 Directory entry type                 = Indirect
 Catalog database partition number    = 0
 Alternate server hostname            =
 Alternate server port number         =

[db2inst1@c-db2oltp-1652327406348200-db2u-0 - Db2U db2inst1]$ db2 connect to bludb

   Database Connection Information

 Database server        = DB2/LINUXX8664 11.5.7.0
 SQL authorization ID   = DB2INST1
 Local database alias   = BLUDB
```

### MISC  

```yaml
[root@bastion ~]# kubectl get pod -o yaml   
..

    labels:
      app: db2oltp-1652327406348200
      component: db2oltp
      controller-revision-hash: c-db2oltp-1652327406348200-db2u-7bb68f48b6
      db2u/cpdbr: db2u
      formation_id: db2oltp-1652327406348200
      icpdsupport/addOnId: db2oltp

..
              f:volumeMounts:
                .: {}
                k:{"mountPath":"/db2u/license/"}:
                  .: {}
                  f:mountPath: {}
                  f:name: {}
                  f:readOnly: {}
                k:{"mountPath":"/dev/shm"}:
                  .: {}
                  f:mountPath: {}
                  f:name: {}
                k:{"mountPath":"/mnt/backup"}:
                  .: {}
                  f:mountPath: {}
                  f:name: {}
                k:{"mountPath":"/mnt/bludata0"}:
                  .: {}
                  f:mountPath: {}
                  f:name: {}
                k:{"mountPath":"/mnt/blumeta0"}:
                  .: {}
                  f:mountPath: {}
..
                k:{"mountPath":"/mnt/logs/active"}:
                  .: {}
                  f:mountPath: {}
                  f:name: {}
                k:{"mountPath":"/mnt/tempts"}:
                  .: {}
                  f:mountPath: {}
                  f:name: {}
                k:{"mountPath":"/run"}:
                  .: {}
                  f:mountPath: {}
                  f:name: {}
                k:{"mountPath":"/secrets/certs/db2u-api"}:
                  .: {}
                  f:mountPath: {}
                  f:name: {}
                  f:readOnly: {}
                k:{"mountPath":"/secrets/certs/wv-rest"}:
..

```


