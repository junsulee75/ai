---
sidebar_position: 1
---

# Underlying C4PD ( Cloud Pak for Data )

Exploring the openshift environment having C4PD from DB2 perspective.       


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

## Openshift 

First of all, my test environment has 8 nodes including bastion, bootstrap node, then 3 masters and workers nodes each.   

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


[root@bastion ~]# kubectl get deployments.apps
NAME                                        READY   UP-TO-DATE   AVAILABLE   AGE
ibm-dmc-1655866151309320-admin              2/2     2            2           2d1h
ibm-dmc-1655866151309320-dbapi              2/2     2            2           2d1h
ibm-dmc-1655866151309320-explain            2/2     2            2           2d1h
ibm-dmc-1655866151309320-job-scheduler      1/1     1            1           2d1h
ibm-dmc-1655866151309320-nginx              2/2     2            2           2d1h
ibm-dmc-1655866151309320-registry-manager   1/1     1            1           2d1h
ibm-dmc-1655866151309320-runsql             1/1     1            1           2d1h
ibm-dmc-addon-api                           1/1     1            1           2d2h
ibm-dmc-addon-ui                            1/1     1            1           2d2h
ibm-nginx                                   2/2     2            2           2d5h
ibm-nginx-tester                            1/1     1            1           23h
usermgmt                                    2/2     2            2           2d5h
zen-audit                                   1/1     1            1           2d5h
zen-core                                    2/2     2            2           2d5h
zen-core-api                                2/2     2            2           2d5h
zen-data-sorcerer                           1/1     1            1           2d5h
zen-database-core                           1/1     1            1           2d3h
zen-databases                               2/2     2            2           2d3h
zen-watchdog                                1/1     1            1           2d5h
zen-watcher                                 1/1     1            1           2d5h

[root@bastion ~]# oc describe pod c-db2oltp-1655862364134421-db2u-0
Name:         c-db2oltp-1655862364134421-db2u-0
Namespace:    sandy
Priority:     0
Node:         worker03.js.ocp.adl/18.10.140.156
Start Time:   Tue, 21 Jun 2022 21:52:03 -0400
Labels:       app=db2oltp-1655862364134421
              component=db2oltp
              controller-revision-hash=c-db2oltp-1655862364134421-db2u-5c9cf67c49
              db2u/cpdbr=db2u
              formation_id=db2oltp-1655862364134421
              icpdsupport/addOnId=db2oltp
              icpdsupport/app=db2oltp-1655862364134421
              icpdsupport/createdBy=1000330999
              icpdsupport/podSelector=db2u-log
              icpdsupport/serviceInstanceId=1655862364134421
              name=dashmpp-head-0
              role=db
              statefulset.kubernetes.io/pod-name=c-db2oltp-1655862364134421-db2u-0
              type=engine
Annotations:  cloudpakId: c520bfe3b42a4e20a9ead3c0ad1654b7
              cloudpakInstanceId: 0f0cb0d5-5105-41fb-b466-7daaaa0ff889
              cloudpakName: IBM Db2 Extension for IBM Cloud Pak for Data
              k8s.v1.cni.cncf.io/network-status:
                [{
                    "name": "",
                    "interface": "eth0",
                    "ips": [
                        "121.159.0.90"
                    ],
                    "default": true,
                    "dns": {}
                }]
              k8s.v1.cni.cncf.io/networks-status:
                [{
                    "name": "",
                    "interface": "eth0",
                    "ips": [
                        "121.159.0.90"
                    ],
                    "default": true,
                    "dns": {}
                }]
              openshift.io/scc: sandy-c-db2oltp-1655862364134421-scc
              productChargedContainers: All
              productID: c520bfe3b42a4e20a9ead3c0ad1654b7
              productMetric: VIRTUAL_PROCESSOR_CORE
              productName: IBM Db2 Extension for IBM Cloud Pak for Data
              productVersion: 11.5.7.0-cn4
Status:       Running
IP:           121.159.0.90
IPs:
  IP:           121.159.0.90
Controlled By:  StatefulSet/c-db2oltp-1655862364134421-db2u
Init Containers:
  init-labels:
    Container ID:  cri-o://bac22e280cbc06a881bd45997c8e464d2a55a29b026248bce9db6beb7354ff39
    Image:         icr.io/db2u/db2u.tools@sha256:8581008145ffc7abc6ced1d776fd95632b312e67eb383ddf74c4374d470ec149
    Image ID:      icr.io/db2u/db2u.tools@sha256:8581008145ffc7abc6ced1d776fd95632b312e67eb383ddf74c4374d470ec149
    Port:          <none>
    Host Port:     <none>
    Command:
      bash
      -ec
      /tools/pre-install/db2u_init.sh ${MLN_TOTAL} ${REPLICAS}
    State:          Terminated
      Reason:       Completed
      Exit Code:    0
      Started:      Tue, 21 Jun 2022 21:53:07 -0400
      Finished:     Tue, 21 Jun 2022 21:53:10 -0400
    Ready:          True
    Restart Count:  0
    Limits:
      cpu:                500m
      ephemeral-storage:  5Mi
      memory:             256Mi
    Requests:
      cpu:                100m
      ephemeral-storage:  1Mi
      memory:             50Mi
    Environment:
      SERVICENAME:                c-db2oltp-1655862364134421-db2u
      DB2TYPE:                    db2oltp
      POD_NAME:                   c-db2oltp-1655862364134421-db2u-0 (v1:metadata.name)
      POD_NAMESPACE:              sandy (v1:metadata.namespace)
      MLN_TOTAL:                  1
      REPLICAS:                   1
      SERVICE_NAME:               c-db2oltp-1655862364134421-db2u-internal
      DB2U_API_ENDPOINT:          c-db2oltp-1655862364134421-db2u-internal.sandy.svc:50052
      DB2U_API_DATABASE_BACKEND:  k8s
      DB2U_API_CONFIGMAP_NAME:    c-db2oltp-1655862364134421-db2u-api
      DB2U_API_KEY_FILE:          /secrets/certs/db2u-api/tls.key
      DB2U_API_CERT_FILE:         /secrets/certs/db2u-api/tls.crt
    Mounts:
      /mnt/blumeta0 from meta (rw)
      /mnt/blumeta0/configmap/db2u from db2uconfig (ro)
      /var/run/secrets/kubernetes.io/serviceaccount from account-sandy-db2oltp-1655862364134421-token-gd2rh (ro)
  init-kernel:
    Container ID:  cri-o://ac50fdf7a82427f10d3ce82c2b5dc2886443ae8652e0476ef1347cfe6c4a5bac
    Image:         icr.io/db2u/db2u.tools@sha256:8581008145ffc7abc6ced1d776fd95632b312e67eb383ddf74c4374d470ec149
    Image ID:      icr.io/db2u/db2u.tools@sha256:8581008145ffc7abc6ced1d776fd95632b312e67eb383ddf74c4374d470ec149
    Port:          <none>
    Host Port:     <none>
    Command:
      bash
      -ec
      /tools/pre-install/set_kernel_params.sh
    State:          Terminated
      Reason:       Completed
      Exit Code:    0
      Started:      Tue, 21 Jun 2022 21:53:11 -0400
      Finished:     Tue, 21 Jun 2022 21:53:12 -0400
    Ready:          True
    Restart Count:  0
    Limits:
      cpu:                500m
      ephemeral-storage:  5Mi
      memory:             256Mi
    Requests:
      cpu:                100m
      ephemeral-storage:  1Mi
      memory:             50Mi
    Environment:
      SERVICENAME:                c-db2oltp-1655862364134421-db2u
      POD_NAME:                   c-db2oltp-1655862364134421-db2u-0 (v1:metadata.name)
      POD_NAMESPACE:              sandy (v1:metadata.namespace)
      MEMORY_LIMIT:               268435456 (limits.memory)
      SERVICE_NAME:               c-db2oltp-1655862364134421-db2u-internal
      DB2U_API_ENDPOINT:          c-db2oltp-1655862364134421-db2u-internal.sandy.svc:50052
      DB2U_API_DATABASE_BACKEND:  k8s
      DB2U_API_CONFIGMAP_NAME:    c-db2oltp-1655862364134421-db2u-api
      DB2U_API_KEY_FILE:          /secrets/certs/db2u-api/tls.key
      DB2U_API_CERT_FILE:         /secrets/certs/db2u-api/tls.crt
    Mounts:
      /host/proc from proc (rw)
      /mnt/blumeta0 from meta (rw)
      /var/run/secrets/kubernetes.io/serviceaccount from account-sandy-db2oltp-1655862364134421-token-gd2rh (ro)
Containers:
  db2u:
    Container ID:   cri-o://cb7021e43da559bd5ff878460283b261338c145afd5138abc6fd449cea2c4a52
    Image:          icr.io/db2u/db2u@sha256:0d55343dc4f9b6e9c349da0f35145ebd65e219817a626c2960b046ca266ab394
    Image ID:       icr.io/db2u/db2u@sha256:0d55343dc4f9b6e9c349da0f35145ebd65e219817a626c2960b046ca266ab394
    Ports:          50000/TCP, 50001/TCP, 50052/TCP
    Host Ports:     0/TCP, 0/TCP, 0/TCP
    State:          Running
      Started:      Tue, 21 Jun 2022 21:59:54 -0400
    Ready:          True
    Restart Count:  0
    Limits:
      cpu:                500m
      ephemeral-storage:  4Gi
      memory:             4Gi
    Requests:
      cpu:                500m
      ephemeral-storage:  4Gi
      memory:             4Gi
    Readiness:            exec [su - db2inst1 -c timeout 5 ssh -p 50022 -o StrictHostKeyChecking=no db2inst1@${HOSTNAME} -- date] delay=20s timeout=10s period=20s #success=1 #failure=50
    Environment:
      POD:                         (v1:metadata.labels['name'])
      POD_NAME:                   c-db2oltp-1655862364134421-db2u-0 (v1:metadata.name)
      POD_NAMESPACE:              sandy (v1:metadata.namespace)
      MEMORY_REQUEST:             4294967296 (requests.memory)
      MEMORY_LIMIT:               4294967296 (limits.memory)
      CPU_LIMIT:                  1 (limits.cpu)
      etcdoperator:               true
      WV_RECOVERY:                partial
      WV_HACLASS:                 UDB
      ETCD_ENDPOINTS:             http://c-db2oltp-1655862364134421-etcd-0.c-db2oltp-1655862364134421-etcd:2379,http://c-db2oltp-1655862364134421-etcd-0.c-db2oltp-1655862364134421-etcd:2379,http://c-db2oltp-1655862364134421-etcd-0.c-db2oltp-1655862364134421-etcd:2379
      ETCDCTL_API:                3
      ETCDCTL_ENDPOINTS:          http://c-db2oltp-1655862364134421-etcd-0.c-db2oltp-1655862364134421-etcd:2379,http://c-db2oltp-1655862364134421-etcd-0.c-db2oltp-1655862364134421-etcd:2379,http://c-db2oltp-1655862364134421-etcd-0.c-db2oltp-1655862364134421-etcd:2379
      SERVICE_NAME:               c-db2oltp-1655862364134421-db2u-internal
      DB2U_API_ENDPOINT:          c-db2oltp-1655862364134421-db2u-internal.sandy.svc:50052
      DB2U_API_DATABASE_BACKEND:  k8s
      DB2U_API_CONFIGMAP_NAME:    c-db2oltp-1655862364134421-db2u-api
      DB2U_API_KEY_FILE:          /secrets/certs/db2u-api/tls.key
      DB2U_API_CERT_FILE:         /secrets/certs/db2u-api/tls.crt
    Mounts:
      /db2u/license/ from db2u-lic (ro)
      /dev/shm from dshm (rw)
      /mnt/backup from backup (rw)
      /mnt/bludata0 from data (rw)
      /mnt/blumeta0 from meta (rw)
      /mnt/blumeta0/configmap/db2/db-cfg from db2dbconfig (ro)
      /mnt/blumeta0/configmap/db2/dbm-cfg from db2dbmconfig (ro)
      /mnt/blumeta0/configmap/db2/registry from db2regconfig (ro)
      /mnt/blumeta0/configmap/db2u from db2uconfig (ro)
      /mnt/local from local (rw)
      /mnt/logs/active from activelogs (rw)
      /mnt/tempts from tempts (rw)
      /run from dshm (rw)
      /secrets/certs/db2u-api from certs-db2u-api (ro)
      /secrets/certs/wv-rest from certs-wv-rest (ro)
      /secrets/db2instancepwd from instancepassword (ro)
      /secrets/db2ssl from db2ssl (ro)
      /secrets/external/zen-service-broker-secret from zen-service-broker-secret (ro)
      /secrets/sshkeys/db2instusr from sshkeys-db2instusr (ro)
      /secrets/sshkeys/db2uadm from sshkeys-db2uadm (ro)
      /secrets/sshkeys/db2uhausr from sshkeys-db2uhausr (ro)
      /var/run/secrets/kubernetes.io/serviceaccount from account-sandy-db2oltp-1655862364134421-token-gd2rh (ro)
Conditions:
  Type              Status
  Initialized       True 
  Ready             True 
  ContainersReady   True 
  PodScheduled      True 
Volumes:
  activelogs:
    Type:       PersistentVolumeClaim (a reference to a PersistentVolumeClaim in the same namespace)
    ClaimName:  activelogs-c-db2oltp-1655862364134421-db2u-0
    ReadOnly:   false
  tempts:
    Type:       PersistentVolumeClaim (a reference to a PersistentVolumeClaim in the same namespace)
    ClaimName:  tempts-c-db2oltp-1655862364134421-db2u-0
    ReadOnly:   false
  data:
    Type:       PersistentVolumeClaim (a reference to a PersistentVolumeClaim in the same namespace)
    ClaimName:  data-c-db2oltp-1655862364134421-db2u-0
    ReadOnly:   false
  meta:
    Type:       PersistentVolumeClaim (a reference to a PersistentVolumeClaim in the same namespace)
    ClaimName:  c-db2oltp-1655862364134421-meta
    ReadOnly:   false
  backup:
    Type:       PersistentVolumeClaim (a reference to a PersistentVolumeClaim in the same namespace)
    ClaimName:  c-db2oltp-1655862364134421-backup
    ReadOnly:   false
  dshm:
    Type:       EmptyDir (a temporary directory that shares a pod's lifetime)
    Medium:     Memory
    SizeLimit:  <unset>
  local:
    Type:       EmptyDir (a temporary directory that shares a pod's lifetime)
    Medium:     
    SizeLimit:  <unset>
  proc:
    Type:          HostPath (bare host directory volume)
    Path:          /proc
    HostPathType:  
  db2uconfig:
    Type:      ConfigMap (a volume populated by a ConfigMap)
    Name:      c-db2oltp-1655862364134421-db2uconfig
    Optional:  false
  db2regconfig:
    Type:      ConfigMap (a volume populated by a ConfigMap)
    Name:      c-db2oltp-1655862364134421-db2regconfig
    Optional:  false
  db2dbmconfig:
    Type:      ConfigMap (a volume populated by a ConfigMap)
    Name:      c-db2oltp-1655862364134421-db2dbmconfig
    Optional:  false
  db2dbconfig:
    Type:      ConfigMap (a volume populated by a ConfigMap)
    Name:      c-db2oltp-1655862364134421-db2dbconfig
    Optional:  false
  certs-wv-rest:
    Type:        Secret (a volume populated by a Secret)
    SecretName:  c-db2oltp-1655862364134421-certs-wv-rest
    Optional:    false
  db2u-lic:
    Type:        Secret (a volume populated by a Secret)
    SecretName:  c-db2oltp-1655862364134421-db2u-lic
    Optional:    false
  sshkeys-db2uadm:
    Type:        Secret (a volume populated by a Secret)
    SecretName:  c-db2oltp-1655862364134421-sshkeys-db2uadm
    Optional:    false
  instancepassword:
    Type:        Secret (a volume populated by a Secret)
    SecretName:  c-db2oltp-1655862364134421-instancepassword
    Optional:    false
  sshkeys-db2instusr:
    Type:        Secret (a volume populated by a Secret)
    SecretName:  c-db2oltp-1655862364134421-sshkeys-db2instusr
    Optional:    false
  sshkeys-db2uhausr:
    Type:        Secret (a volume populated by a Secret)
    SecretName:  c-db2oltp-1655862364134421-sshkeys-db2uhausr
    Optional:    false
  db2ssl:
    Type:        Secret (a volume populated by a Secret)
    SecretName:  db2oltp-internal-tls
    Optional:    false
  certs-db2u-api:
    Type:        Secret (a volume populated by a Secret)
    SecretName:  c-db2oltp-1655862364134421-certs-db2u-api
    Optional:    false
  zen-service-broker-secret:
    Type:        Secret (a volume populated by a Secret)
    SecretName:  zen-service-broker-secret
    Optional:    false
  account-sandy-db2oltp-1655862364134421-token-gd2rh:
    Type:        Secret (a volume populated by a Secret)
    SecretName:  account-sandy-db2oltp-1655862364134421-token-gd2rh
    Optional:    false
QoS Class:       Burstable
Node-Selectors:  <none>
Tolerations:     node.kubernetes.io/memory-pressure:NoSchedule op=Exists
                 node.kubernetes.io/not-ready:NoExecute op=Exists for 300s
                 node.kubernetes.io/unreachable:NoExecute op=Exists for 300s
```

#### API

```
[root@bastion ~]# kubectl api-resources --api-group=db2u.databases.ibm.com 
NAME                 SHORTNAMES   APIGROUP                 NAMESPACED   KIND
bigsqls                           db2u.databases.ibm.com   true         BigSQL
db2uclusters         db2u         db2u.databases.ibm.com   true         Db2uCluster
db2uhadrs                         db2u.databases.ibm.com   true         Db2uHadr
db2uhelmmigrations                db2u.databases.ibm.com   true         Db2uHelmMigration
formationlocks                    db2u.databases.ibm.com   true         FormationLock
formations                        db2u.databases.ibm.com   true         Formation

[root@bastion ~]# kubectl explain db2uclusters
KIND:     Db2uCluster
VERSION:  db2u.databases.ibm.com/v1

DESCRIPTION:
     Db2uCluster is the API for deploying Db2. Documentation for additional
     information check: https://ibm.biz/BdqNGJ. License By installing this
     product you accept the license terms https://ibm.biz/BdqNGh.

FIELDS:
   apiVersion	<string>
     APIVersion defines the versioned schema of this representation of an
     object. Servers should convert recognized schemas to the latest internal
     value, and may reject unrecognized values. More info:
     https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

   kind	<string>
     Kind is a string value representing the REST resource this object
     represents. Servers may infer this from the endpoint the client submits
     requests to. Cannot be updated. In CamelCase. More info:
     https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

   metadata	<Object>
     Standard object's metadata. More info:
     https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

   spec	<Object>
     Spec defines the desired identities of resource in this set.

   status	<Object>
     Status is the current status of resource in this Db2uClusterStatus. This
     data may be out of date by some window of time.

[root@bastion ~]# oc get pod c-db2oltp-1655862364134421-db2u-0 -o yaml
apiVersion: v1
kind: Pod
metadata:
  annotations:
    cloudpakId: c520bfe3b42a4e20a9ead3c0ad1654b7
    cloudpakInstanceId: 0f0cb0d5-5105-41fb-b466-7daaaa0ff889
    cloudpakName: IBM Db2 Extension for IBM Cloud Pak for Data
    k8s.v1.cni.cncf.io/network-status: |-
      [{
          "name": "",
          "interface": "eth0",
          "ips": [
              "121.159.0.90"
          ],
          "default": true,
          "dns": {}
      }]
    k8s.v1.cni.cncf.io/networks-status: |-
      [{
          "name": "",
          "interface": "eth0",
          "ips": [
              "121.159.0.90"
          ],
          "default": true,
          "dns": {}
      }]
    openshift.io/scc: sandy-c-db2oltp-1655862364134421-scc
    productChargedContainers: All
    productID: c520bfe3b42a4e20a9ead3c0ad1654b7
    productMetric: VIRTUAL_PROCESSOR_CORE
    productName: IBM Db2 Extension for IBM Cloud Pak for Data
    productVersion: 11.5.7.0-cn4
  creationTimestamp: "2022-06-22T01:52:00Z"
  generateName: c-db2oltp-1655862364134421-db2u-
  labels:
    app: db2oltp-1655862364134421
    component: db2oltp
    controller-revision-hash: c-db2oltp-1655862364134421-db2u-5c9cf67c49
    db2u/cpdbr: db2u
    formation_id: db2oltp-1655862364134421
    icpdsupport/addOnId: db2oltp
    icpdsupport/app: db2oltp-1655862364134421
    icpdsupport/createdBy: "1000330999"
    icpdsupport/podSelector: db2u-log
    icpdsupport/serviceInstanceId: "1655862364134421"
    name: dashmpp-head-0
    role: db
    statefulset.kubernetes.io/pod-name: c-db2oltp-1655862364134421-db2u-0
    type: engine
  managedFields:
  - apiVersion: v1
    fieldsType: FieldsV1
    fieldsV1:
      f:metadata:
        f:annotations:
          .: {}
          f:cloudpakId: {}
          f:cloudpakInstanceId: {}
          f:cloudpakName: {}
          f:productChargedContainers: {}
          f:productID: {}
          f:productMetric: {}
          f:productName: {}
          f:productVersion: {}
        f:generateName: {}
        f:labels:
          .: {}
          f:app: {}
          f:component: {}
          f:controller-revision-hash: {}
          f:db2u/cpdbr: {}
          f:formation_id: {}
          f:icpdsupport/addOnId: {}
          f:icpdsupport/app: {}
          f:icpdsupport/createdBy: {}
          f:icpdsupport/podSelector: {}
          f:icpdsupport/serviceInstanceId: {}
          f:role: {}
          f:statefulset.kubernetes.io/pod-name: {}
          f:type: {}
        f:ownerReferences:
          .: {}
          k:{"uid":"d633e2b4-e0a7-48c8-b767-4a5306a3d3d8"}:
            .: {}
            f:apiVersion: {}
            f:blockOwnerDeletion: {}
            f:controller: {}
            f:kind: {}
            f:name: {}
            f:uid: {}
      f:spec:
        f:affinity:
          .: {}
          f:podAntiAffinity: {}
        f:containers:
          k:{"name":"db2u"}:
            .: {}
            f:env:
              .: {}
              k:{"name":"CPU_LIMIT"}:
                .: {}
                f:name: {}
                f:valueFrom:
                  .: {}
                  f:resourceFieldRef:
                    .: {}
                    f:divisor: {}
                    f:resource: {}
              k:{"name":"DB2U_API_CERT_FILE"}:
                .: {}
                f:name: {}
                f:value: {}
              k:{"name":"DB2U_API_CONFIGMAP_NAME"}:
                .: {}
                f:name: {}
                f:value: {}
              k:{"name":"DB2U_API_DATABASE_BACKEND"}:
                .: {}
                f:name: {}
                f:value: {}
              k:{"name":"DB2U_API_ENDPOINT"}:
                .: {}
                f:name: {}
                f:value: {}
              k:{"name":"DB2U_API_KEY_FILE"}:
                .: {}
                f:name: {}
                f:value: {}
              k:{"name":"ETCD_ENDPOINTS"}:
                .: {}
                f:name: {}
                f:value: {}
              k:{"name":"ETCDCTL_API"}:
                .: {}
                f:name: {}
                f:value: {}
              k:{"name":"ETCDCTL_ENDPOINTS"}:
                .: {}
                f:name: {}
                f:value: {}
              k:{"name":"MEMORY_LIMIT"}:
                .: {}
                f:name: {}
                f:valueFrom:
                  .: {}
                  f:resourceFieldRef:
                    .: {}
                    f:divisor: {}
                    f:resource: {}
              k:{"name":"MEMORY_REQUEST"}:
                .: {}
                f:name: {}
                f:valueFrom:
                  .: {}
                  f:resourceFieldRef:
                    .: {}
                    f:divisor: {}
                    f:resource: {}
              k:{"name":"POD"}:
                .: {}
                f:name: {}
                f:valueFrom:
                  .: {}
                  f:fieldRef:
                    .: {}
                    f:apiVersion: {}
                    f:fieldPath: {}
              k:{"name":"POD_NAME"}:
                .: {}
                f:name: {}
                f:valueFrom:
                  .: {}
                  f:fieldRef:
                    .: {}
                    f:apiVersion: {}
                    f:fieldPath: {}
              k:{"name":"POD_NAMESPACE"}:
                .: {}
                f:name: {}
                f:valueFrom:
                  .: {}
                  f:fieldRef:
                    .: {}
                    f:apiVersion: {}
                    f:fieldPath: {}
              k:{"name":"SERVICE_NAME"}:
                .: {}
                f:name: {}
                f:value: {}
              k:{"name":"WV_HACLASS"}:
                .: {}
                f:name: {}
                f:value: {}
              k:{"name":"WV_RECOVERY"}:
                .: {}
                f:name: {}
                f:value: {}
              k:{"name":"etcdoperator"}:
                .: {}
                f:name: {}
                f:value: {}
            f:image: {}
            f:imagePullPolicy: {}
            f:name: {}
            f:ports:
              .: {}
              k:{"containerPort":50000,"protocol":"TCP"}:
                .: {}
                f:containerPort: {}
                f:name: {}
                f:protocol: {}
              k:{"containerPort":50001,"protocol":"TCP"}:
                .: {}
                f:containerPort: {}
                f:name: {}
                f:protocol: {}
              k:{"containerPort":50052,"protocol":"TCP"}:
                .: {}
                f:containerPort: {}
                f:name: {}
                f:protocol: {}
            f:readinessProbe:
              .: {}
              f:exec:
                .: {}
                f:command: {}
              f:failureThreshold: {}
              f:initialDelaySeconds: {}
              f:periodSeconds: {}
              f:successThreshold: {}
              f:timeoutSeconds: {}
            f:resources:
              .: {}
              f:limits:
                .: {}
                f:cpu: {}
                f:ephemeral-storage: {}
                f:memory: {}
              f:requests:
                .: {}
                f:cpu: {}
                f:ephemeral-storage: {}
                f:memory: {}
            f:securityContext:
              .: {}
              f:allowPrivilegeEscalation: {}
              f:capabilities:
                .: {}
                f:add: {}
                f:drop: {}
              f:runAsUser: {}
            f:terminationMessagePath: {}
            f:terminationMessagePolicy: {}
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
                f:name: {}
              k:{"mountPath":"/mnt/blumeta0/configmap/db2/db-cfg"}:
                .: {}
                f:mountPath: {}
                f:name: {}
                f:readOnly: {}
              k:{"mountPath":"/mnt/blumeta0/configmap/db2/dbm-cfg"}:
                .: {}
                f:mountPath: {}
                f:name: {}
                f:readOnly: {}
              k:{"mountPath":"/mnt/blumeta0/configmap/db2/registry"}:
                .: {}
                f:mountPath: {}
                f:name: {}
                f:readOnly: {}
              k:{"mountPath":"/mnt/blumeta0/configmap/db2u"}:
                .: {}
                f:mountPath: {}
                f:name: {}
                f:readOnly: {}
              k:{"mountPath":"/mnt/local"}:
                .: {}
                f:mountPath: {}
                f:name: {}
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
                .: {}
                f:mountPath: {}
                f:name: {}
                f:readOnly: {}
              k:{"mountPath":"/secrets/db2instancepwd"}:
                .: {}
                f:mountPath: {}
                f:name: {}
                f:readOnly: {}
              k:{"mountPath":"/secrets/db2ssl"}:
                .: {}
                f:mountPath: {}
                f:name: {}
                f:readOnly: {}
              k:{"mountPath":"/secrets/external/zen-service-broker-secret"}:
                .: {}
                f:mountPath: {}
                f:name: {}
                f:readOnly: {}
              k:{"mountPath":"/secrets/sshkeys/db2instusr"}:
                .: {}
                f:mountPath: {}
                f:name: {}
                f:readOnly: {}
              k:{"mountPath":"/secrets/sshkeys/db2uadm"}:
                .: {}
                f:mountPath: {}
                f:name: {}
                f:readOnly: {}
              k:{"mountPath":"/secrets/sshkeys/db2uhausr"}:
                .: {}
                f:mountPath: {}
                f:name: {}
                f:readOnly: {}
        f:dnsConfig:
          .: {}
          f:options: {}
        f:dnsPolicy: {}
        f:enableServiceLinks: {}
        f:hostname: {}
        f:initContainers:
          .: {}
          k:{"name":"init-kernel"}:
            .: {}
            f:command: {}
            f:env:
              .: {}
              k:{"name":"DB2U_API_CERT_FILE"}:
                .: {}
                f:name: {}
                f:value: {}
              k:{"name":"DB2U_API_CONFIGMAP_NAME"}:
                .: {}
                f:name: {}
                f:value: {}
              k:{"name":"DB2U_API_DATABASE_BACKEND"}:
                .: {}
                f:name: {}
                f:value: {}
              k:{"name":"DB2U_API_ENDPOINT"}:
                .: {}
                f:name: {}
                f:value: {}
              k:{"name":"DB2U_API_KEY_FILE"}:
                .: {}
                f:name: {}
                f:value: {}
              k:{"name":"MEMORY_LIMIT"}:
                .: {}
                f:name: {}
                f:valueFrom:
                  .: {}
                  f:resourceFieldRef:
                    .: {}
                    f:containerName: {}
                    f:divisor: {}
                    f:resource: {}
              k:{"name":"POD_NAME"}:
                .: {}
                f:name: {}
                f:valueFrom:
                  .: {}
                  f:fieldRef:
                    .: {}
                    f:apiVersion: {}
                    f:fieldPath: {}
              k:{"name":"POD_NAMESPACE"}:
                .: {}
                f:name: {}
                f:valueFrom:
                  .: {}
                  f:fieldRef:
                    .: {}
                    f:apiVersion: {}
                    f:fieldPath: {}
              k:{"name":"SERVICE_NAME"}:
                .: {}
                f:name: {}
                f:value: {}
              k:{"name":"SERVICENAME"}:
                .: {}
                f:name: {}
                f:value: {}
            f:image: {}
            f:imagePullPolicy: {}
            f:name: {}
            f:resources:
              .: {}
              f:limits:
                .: {}
                f:cpu: {}
                f:ephemeral-storage: {}
                f:memory: {}
              f:requests:
                .: {}
                f:cpu: {}
                f:ephemeral-storage: {}
                f:memory: {}
            f:securityContext:
              .: {}
              f:allowPrivilegeEscalation: {}
              f:capabilities:
                .: {}
                f:drop: {}
              f:privileged: {}
              f:runAsNonRoot: {}
              f:runAsUser: {}
            f:terminationMessagePath: {}
            f:terminationMessagePolicy: {}
            f:volumeMounts:
              .: {}
              k:{"mountPath":"/host/proc"}:
                .: {}
                f:mountPath: {}
                f:name: {}
              k:{"mountPath":"/mnt/blumeta0"}:
                .: {}
                f:mountPath: {}
                f:name: {}
          k:{"name":"init-labels"}:
            .: {}
            f:command: {}
            f:env:
              .: {}
              k:{"name":"DB2TYPE"}:
                .: {}
                f:name: {}
                f:value: {}
              k:{"name":"DB2U_API_CERT_FILE"}:
                .: {}
                f:name: {}
                f:value: {}
              k:{"name":"DB2U_API_CONFIGMAP_NAME"}:
                .: {}
                f:name: {}
                f:value: {}
              k:{"name":"DB2U_API_DATABASE_BACKEND"}:
                .: {}
                f:name: {}
                f:value: {}
              k:{"name":"DB2U_API_ENDPOINT"}:
                .: {}
                f:name: {}
                f:value: {}
              k:{"name":"DB2U_API_KEY_FILE"}:
                .: {}
                f:name: {}
                f:value: {}
              k:{"name":"MLN_TOTAL"}:
                .: {}
                f:name: {}
                f:value: {}
              k:{"name":"POD_NAME"}:
                .: {}
                f:name: {}
                f:valueFrom:
                  .: {}
                  f:fieldRef:
                    .: {}
                    f:apiVersion: {}
                    f:fieldPath: {}
              k:{"name":"POD_NAMESPACE"}:
                .: {}
                f:name: {}
                f:valueFrom:
                  .: {}
                  f:fieldRef:
                    .: {}
                    f:apiVersion: {}
                    f:fieldPath: {}
              k:{"name":"REPLICAS"}:
                .: {}
                f:name: {}
                f:value: {}
              k:{"name":"SERVICE_NAME"}:
                .: {}
                f:name: {}
                f:value: {}
              k:{"name":"SERVICENAME"}:
                .: {}
                f:name: {}
                f:value: {}
            f:image: {}
            f:imagePullPolicy: {}
            f:name: {}
            f:resources:
              .: {}
              f:limits:
                .: {}
                f:cpu: {}
                f:ephemeral-storage: {}
                f:memory: {}
              f:requests:
                .: {}
                f:cpu: {}
                f:ephemeral-storage: {}
                f:memory: {}
            f:securityContext:
              .: {}
              f:allowPrivilegeEscalation: {}
              f:capabilities:
                .: {}
                f:add: {}
                f:drop: {}
              f:runAsUser: {}
            f:terminationMessagePath: {}
            f:terminationMessagePolicy: {}
            f:volumeMounts:
              .: {}
              k:{"mountPath":"/mnt/blumeta0"}:
                .: {}
                f:mountPath: {}
                f:name: {}
              k:{"mountPath":"/mnt/blumeta0/configmap/db2u"}:
                .: {}
                f:mountPath: {}
                f:name: {}
                f:readOnly: {}
        f:restartPolicy: {}
        f:schedulerName: {}
        f:securityContext:
          .: {}
          f:runAsNonRoot: {}
        f:serviceAccount: {}
        f:serviceAccountName: {}
        f:subdomain: {}
        f:terminationGracePeriodSeconds: {}
        f:volumes:
          .: {}
          k:{"name":"activelogs"}:
            .: {}
            f:name: {}
            f:persistentVolumeClaim:
              .: {}
              f:claimName: {}
          k:{"name":"backup"}:
            .: {}
            f:name: {}
            f:persistentVolumeClaim:
              .: {}
              f:claimName: {}
          k:{"name":"certs-db2u-api"}:
            .: {}
            f:name: {}
            f:secret:
              .: {}
              f:defaultMode: {}
              f:optional: {}
              f:secretName: {}
          k:{"name":"certs-wv-rest"}:
            .: {}
            f:name: {}
            f:secret:
              .: {}
              f:defaultMode: {}
              f:optional: {}
              f:secretName: {}
          k:{"name":"data"}:
            .: {}
            f:name: {}
            f:persistentVolumeClaim:
              .: {}
              f:claimName: {}
          k:{"name":"db2dbconfig"}:
            .: {}
            f:configMap:
              .: {}
              f:defaultMode: {}
              f:name: {}
            f:name: {}
          k:{"name":"db2dbmconfig"}:
            .: {}
            f:configMap:
              .: {}
              f:defaultMode: {}
              f:name: {}
            f:name: {}
          k:{"name":"db2regconfig"}:
            .: {}
            f:configMap:
              .: {}
              f:defaultMode: {}
              f:name: {}
            f:name: {}
          k:{"name":"db2ssl"}:
            .: {}
            f:name: {}
            f:secret:
              .: {}
              f:defaultMode: {}
              f:optional: {}
              f:secretName: {}
          k:{"name":"db2u-lic"}:
            .: {}
            f:name: {}
            f:secret:
              .: {}
              f:defaultMode: {}
              f:optional: {}
              f:secretName: {}
          k:{"name":"db2uconfig"}:
            .: {}
            f:configMap:
              .: {}
              f:defaultMode: {}
              f:name: {}
            f:name: {}
          k:{"name":"dshm"}:
            .: {}
            f:emptyDir:
              .: {}
              f:medium: {}
            f:name: {}
          k:{"name":"instancepassword"}:
            .: {}
            f:name: {}
            f:secret:
              .: {}
              f:defaultMode: {}
              f:optional: {}
              f:secretName: {}
          k:{"name":"local"}:
            .: {}
            f:emptyDir: {}
            f:name: {}
          k:{"name":"meta"}:
            .: {}
            f:name: {}
            f:persistentVolumeClaim:
              .: {}
              f:claimName: {}
          k:{"name":"proc"}:
            .: {}
            f:hostPath:
              .: {}
              f:path: {}
              f:type: {}
            f:name: {}
          k:{"name":"sshkeys-db2instusr"}:
            .: {}
            f:name: {}
            f:secret:
              .: {}
              f:defaultMode: {}
              f:optional: {}
              f:secretName: {}
          k:{"name":"sshkeys-db2uadm"}:
            .: {}
            f:name: {}
            f:secret:
              .: {}
              f:defaultMode: {}
              f:optional: {}
              f:secretName: {}
          k:{"name":"sshkeys-db2uhausr"}:
            .: {}
            f:name: {}
            f:secret:
              .: {}
              f:defaultMode: {}
              f:optional: {}
              f:secretName: {}
          k:{"name":"tempts"}:
            .: {}
            f:name: {}
            f:persistentVolumeClaim:
              .: {}
              f:claimName: {}
          k:{"name":"zen-service-broker-secret"}:
            .: {}
            f:name: {}
            f:secret:
              .: {}
              f:defaultMode: {}
              f:secretName: {}
    manager: kube-controller-manager
    operation: Update
    time: "2022-06-22T01:52:00Z"
  - apiVersion: v1
    fieldsType: FieldsV1
    fieldsV1:
      f:status:
        f:conditions:
          .: {}
          k:{"type":"PodScheduled"}:
            .: {}
            f:lastProbeTime: {}
            f:lastTransitionTime: {}
            f:message: {}
            f:reason: {}
            f:status: {}
            f:type: {}
    manager: kube-scheduler
    operation: Update
    time: "2022-06-22T01:52:00Z"
  - apiVersion: v1
    fieldsType: FieldsV1
    fieldsV1:
      f:metadata:
        f:annotations:
          f:k8s.v1.cni.cncf.io/network-status: {}
          f:k8s.v1.cni.cncf.io/networks-status: {}
    manager: multus
    operation: Update
    time: "2022-06-22T01:52:06Z"
  - apiVersion: v1
    fieldsType: FieldsV1
    fieldsV1:
      f:metadata:
        f:labels:
          f:name: {}
    manager: kubectl-label
    operation: Update
    time: "2022-06-22T01:53:09Z"
  - apiVersion: v1
    fieldsType: FieldsV1
    fieldsV1:
      f:status:
        f:conditions:
          k:{"type":"ContainersReady"}:
            .: {}
            f:lastProbeTime: {}
            f:lastTransitionTime: {}
            f:status: {}
            f:type: {}
          k:{"type":"Initialized"}:
            .: {}
            f:lastProbeTime: {}
            f:lastTransitionTime: {}
            f:status: {}
            f:type: {}
          k:{"type":"Ready"}:
            .: {}
            f:lastProbeTime: {}
            f:lastTransitionTime: {}
            f:status: {}
            f:type: {}
        f:containerStatuses: {}
        f:hostIP: {}
        f:initContainerStatuses: {}
        f:phase: {}
        f:podIP: {}
        f:podIPs:
          .: {}
          k:{"ip":"121.159.0.90"}:
            .: {}
            f:ip: {}
        f:startTime: {}
    manager: kubelet
    operation: Update
    time: "2022-06-22T02:00:26Z"
  name: c-db2oltp-1655862364134421-db2u-0
  namespace: sandy
  ownerReferences:
  - apiVersion: apps/v1
    blockOwnerDeletion: true
    controller: true
    kind: StatefulSet
    name: c-db2oltp-1655862364134421-db2u
    uid: d633e2b4-e0a7-48c8-b767-4a5306a3d3d8
  resourceVersion: "337171"
  selfLink: /api/v1/namespaces/sandy/pods/c-db2oltp-1655862364134421-db2u-0
  uid: a77ef362-8427-49c2-85d3-c13c82bc73b7
spec:
  affinity:
    podAntiAffinity: {}
  containers:
  - env:
    - name: POD
      valueFrom:
        fieldRef:
          apiVersion: v1
          fieldPath: metadata.labels['name']
    - name: POD_NAME
      valueFrom:
        fieldRef:
          apiVersion: v1
          fieldPath: metadata.name
    - name: POD_NAMESPACE
      valueFrom:
        fieldRef:
          apiVersion: v1
          fieldPath: metadata.namespace
    - name: MEMORY_REQUEST
      valueFrom:
        resourceFieldRef:
          divisor: "0"
          resource: requests.memory
    - name: MEMORY_LIMIT
      valueFrom:
        resourceFieldRef:
          divisor: "0"
          resource: limits.memory
    - name: CPU_LIMIT
      valueFrom:
        resourceFieldRef:
          divisor: "0"
          resource: limits.cpu
    - name: etcdoperator
      value: "true"
    - name: WV_RECOVERY
      value: partial
    - name: WV_HACLASS
      value: UDB
    - name: ETCD_ENDPOINTS
      value: http://c-db2oltp-1655862364134421-etcd-0.c-db2oltp-1655862364134421-etcd:2379,http://c-db2oltp-1655862364134421-etcd-0.c-db2oltp-1655862364134421-etcd:2379,http://c-db2oltp-1655862364134421-etcd-0.c-db2oltp-1655862364134421-etcd:2379
    - name: ETCDCTL_API
      value: "3"
    - name: ETCDCTL_ENDPOINTS
      value: http://c-db2oltp-1655862364134421-etcd-0.c-db2oltp-1655862364134421-etcd:2379,http://c-db2oltp-1655862364134421-etcd-0.c-db2oltp-1655862364134421-etcd:2379,http://c-db2oltp-1655862364134421-etcd-0.c-db2oltp-1655862364134421-etcd:2379
    - name: SERVICE_NAME
      value: c-db2oltp-1655862364134421-db2u-internal
    - name: DB2U_API_ENDPOINT
      value: c-db2oltp-1655862364134421-db2u-internal.sandy.svc:50052
    - name: DB2U_API_DATABASE_BACKEND
      value: k8s
    - name: DB2U_API_CONFIGMAP_NAME
      value: c-db2oltp-1655862364134421-db2u-api
    - name: DB2U_API_KEY_FILE
      value: /secrets/certs/db2u-api/tls.key
    - name: DB2U_API_CERT_FILE
      value: /secrets/certs/db2u-api/tls.crt
    image: icr.io/db2u/db2u@sha256:0d55343dc4f9b6e9c349da0f35145ebd65e219817a626c2960b046ca266ab394
    imagePullPolicy: IfNotPresent
    name: db2u
    ports:
    - containerPort: 50000
      name: db2-server
      protocol: TCP
    - containerPort: 50001
      name: db2-ssl-server
      protocol: TCP
    - containerPort: 50052
      name: db2uapi
      protocol: TCP
    readinessProbe:
      exec:
        command:
        - su
        - '-'
        - db2inst1
        - -c
        - timeout 5 ssh -p 50022 -o StrictHostKeyChecking=no db2inst1@${HOSTNAME} -- date
      failureThreshold: 50
      initialDelaySeconds: 20
      periodSeconds: 20
      successThreshold: 1
      timeoutSeconds: 10
    resources:
      limits:
        cpu: 500m
        ephemeral-storage: 4Gi
        memory: 4Gi
      requests:
        cpu: 500m
        ephemeral-storage: 4Gi
        memory: 4Gi
    securityContext:
      allowPrivilegeEscalation: true
      capabilities:
        add:
        - SYS_RESOURCE
        - IPC_OWNER
        - SYS_NICE
        - CHOWN
        - DAC_OVERRIDE
        - FSETID
        - FOWNER
        - SETGID
        - SETUID
        - SETFCAP
        - SETPCAP
        - SYS_CHROOT
        - KILL
        - AUDIT_WRITE
        drop:
        - ALL
      runAsUser: 600
    terminationMessagePath: /dev/termination-log
    terminationMessagePolicy: File
    volumeMounts:
    - mountPath: /mnt/blumeta0
      name: meta
    - mountPath: /mnt/bludata0
      name: data
    - mountPath: /mnt/backup
      name: backup
    - mountPath: /mnt/logs/active
      name: activelogs
    - mountPath: /mnt/tempts
      name: tempts
    - mountPath: /dev/shm
      name: dshm
    - mountPath: /mnt/local
      name: local
    - mountPath: /run
      name: dshm
    - mountPath: /mnt/blumeta0/configmap/db2u
      name: db2uconfig
      readOnly: true
    - mountPath: /mnt/blumeta0/configmap/db2/registry
      name: db2regconfig
      readOnly: true
    - mountPath: /mnt/blumeta0/configmap/db2/dbm-cfg
      name: db2dbmconfig
      readOnly: true
    - mountPath: /mnt/blumeta0/configmap/db2/db-cfg
      name: db2dbconfig
      readOnly: true
    - mountPath: /secrets/certs/wv-rest
      name: certs-wv-rest
      readOnly: true
    - mountPath: /db2u/license/
      name: db2u-lic
      readOnly: true
    - mountPath: /secrets/sshkeys/db2uadm
      name: sshkeys-db2uadm
      readOnly: true
    - mountPath: /secrets/db2instancepwd
      name: instancepassword
      readOnly: true
    - mountPath: /secrets/sshkeys/db2instusr
      name: sshkeys-db2instusr
      readOnly: true
    - mountPath: /secrets/sshkeys/db2uhausr
      name: sshkeys-db2uhausr
      readOnly: true
    - mountPath: /secrets/db2ssl
      name: db2ssl
      readOnly: true
    - mountPath: /secrets/certs/db2u-api
      name: certs-db2u-api
      readOnly: true
    - mountPath: /secrets/external/zen-service-broker-secret
      name: zen-service-broker-secret
      readOnly: true
    - mountPath: /var/run/secrets/kubernetes.io/serviceaccount
      name: account-sandy-db2oltp-1655862364134421-token-gd2rh
      readOnly: true
  dnsConfig:
    options:
    - name: ndots
      value: "2"
  dnsPolicy: ClusterFirst
  enableServiceLinks: true
  hostname: c-db2oltp-1655862364134421-db2u-0
  imagePullSecrets:
  - name: db2u-dockercfg-6zrqn
  - name: account-sandy-db2oltp-1655862364134421-dockercfg-bstd5
  initContainers:
  - command:
    - bash
    - -ec
    - /tools/pre-install/db2u_init.sh ${MLN_TOTAL} ${REPLICAS}
    env:
    - name: SERVICENAME
      value: c-db2oltp-1655862364134421-db2u
    - name: DB2TYPE
      value: db2oltp
    - name: POD_NAME
      valueFrom:
        fieldRef:
          apiVersion: v1
          fieldPath: metadata.name
    - name: POD_NAMESPACE
      valueFrom:
        fieldRef:
          apiVersion: v1
          fieldPath: metadata.namespace
    - name: MLN_TOTAL
      value: "1"
    - name: REPLICAS
      value: "1"
    - name: SERVICE_NAME
      value: c-db2oltp-1655862364134421-db2u-internal
    - name: DB2U_API_ENDPOINT
      value: c-db2oltp-1655862364134421-db2u-internal.sandy.svc:50052
    - name: DB2U_API_DATABASE_BACKEND
      value: k8s
    - name: DB2U_API_CONFIGMAP_NAME
      value: c-db2oltp-1655862364134421-db2u-api
    - name: DB2U_API_KEY_FILE
      value: /secrets/certs/db2u-api/tls.key
    - name: DB2U_API_CERT_FILE
      value: /secrets/certs/db2u-api/tls.crt
    image: icr.io/db2u/db2u.tools@sha256:8581008145ffc7abc6ced1d776fd95632b312e67eb383ddf74c4374d470ec149
    imagePullPolicy: IfNotPresent
    name: init-labels
    resources:
      limits:
        cpu: 500m
        ephemeral-storage: 5Mi
        memory: 256Mi
      requests:
        cpu: 100m
        ephemeral-storage: 1Mi
        memory: 50Mi
    securityContext:
      allowPrivilegeEscalation: true
      capabilities:
        add:
        - CHOWN
        - DAC_OVERRIDE
        - FOWNER
        - SETUID
        - SETGID
        drop:
        - ALL
      runAsUser: 500
    terminationMessagePath: /dev/termination-log
    terminationMessagePolicy: File
    volumeMounts:
    - mountPath: /mnt/blumeta0
      name: meta
    - mountPath: /mnt/blumeta0/configmap/db2u
      name: db2uconfig
      readOnly: true
    - mountPath: /var/run/secrets/kubernetes.io/serviceaccount
      name: account-sandy-db2oltp-1655862364134421-token-gd2rh
      readOnly: true
  - command:
    - bash
    - -ec
    - /tools/pre-install/set_kernel_params.sh
    env:
    - name: SERVICENAME
      value: c-db2oltp-1655862364134421-db2u
    - name: POD_NAME
      valueFrom:
        fieldRef:
          apiVersion: v1
          fieldPath: metadata.name
    - name: POD_NAMESPACE
      valueFrom:
        fieldRef:
          apiVersion: v1
          fieldPath: metadata.namespace
    - name: MEMORY_LIMIT
      valueFrom:
        resourceFieldRef:
          containerName: db2u
          divisor: "0"
          resource: limits.memory
    - name: SERVICE_NAME
      value: c-db2oltp-1655862364134421-db2u-internal
    - name: DB2U_API_ENDPOINT
      value: c-db2oltp-1655862364134421-db2u-internal.sandy.svc:50052
    - name: DB2U_API_DATABASE_BACKEND
      value: k8s
    - name: DB2U_API_CONFIGMAP_NAME
      value: c-db2oltp-1655862364134421-db2u-api
    - name: DB2U_API_KEY_FILE
      value: /secrets/certs/db2u-api/tls.key
    - name: DB2U_API_CERT_FILE
      value: /secrets/certs/db2u-api/tls.crt
    image: icr.io/db2u/db2u.tools@sha256:8581008145ffc7abc6ced1d776fd95632b312e67eb383ddf74c4374d470ec149
    imagePullPolicy: IfNotPresent
    name: init-kernel
    resources:
      limits:
        cpu: 500m
        ephemeral-storage: 5Mi
        memory: 256Mi
      requests:
        cpu: 100m
        ephemeral-storage: 1Mi
        memory: 50Mi
    securityContext:
      allowPrivilegeEscalation: true
      capabilities:
        drop:
        - ALL
      privileged: true
      runAsNonRoot: false
      runAsUser: 0
    terminationMessagePath: /dev/termination-log
    terminationMessagePolicy: File
    volumeMounts:
    - mountPath: /mnt/blumeta0
      name: meta
    - mountPath: /host/proc
      name: proc
    - mountPath: /var/run/secrets/kubernetes.io/serviceaccount
      name: account-sandy-db2oltp-1655862364134421-token-gd2rh
      readOnly: true
  nodeName: worker03.js.ocp.adl
  preemptionPolicy: PreemptLowerPriority
  priority: 0
  restartPolicy: Always
  schedulerName: default-scheduler
  securityContext:
    runAsNonRoot: true
    seLinuxOptions:
      level: s0:c25,c15
  serviceAccount: account-sandy-db2oltp-1655862364134421
  serviceAccountName: account-sandy-db2oltp-1655862364134421
  subdomain: c-db2oltp-1655862364134421-db2u-internal
  terminationGracePeriodSeconds: 120
  tolerations:
  - effect: NoExecute
    key: node.kubernetes.io/not-ready
    operator: Exists
    tolerationSeconds: 300
  - effect: NoExecute
    key: node.kubernetes.io/unreachable
    operator: Exists
    tolerationSeconds: 300
  - effect: NoSchedule
    key: node.kubernetes.io/memory-pressure
    operator: Exists
  volumes:
  - name: activelogs
    persistentVolumeClaim:
      claimName: activelogs-c-db2oltp-1655862364134421-db2u-0
  - name: tempts
    persistentVolumeClaim:
      claimName: tempts-c-db2oltp-1655862364134421-db2u-0
  - name: data
    persistentVolumeClaim:
      claimName: data-c-db2oltp-1655862364134421-db2u-0
  - name: meta
    persistentVolumeClaim:
      claimName: c-db2oltp-1655862364134421-meta
  - name: backup
    persistentVolumeClaim:
      claimName: c-db2oltp-1655862364134421-backup
  - emptyDir:
      medium: Memory
    name: dshm
  - emptyDir: {}
    name: local
  - hostPath:
      path: /proc
      type: ""
    name: proc
  - configMap:
      defaultMode: 420
      name: c-db2oltp-1655862364134421-db2uconfig
    name: db2uconfig
  - configMap:
      defaultMode: 420
      name: c-db2oltp-1655862364134421-db2regconfig
    name: db2regconfig
  - configMap:
      defaultMode: 420
      name: c-db2oltp-1655862364134421-db2dbmconfig
    name: db2dbmconfig
  - configMap:
      defaultMode: 420
      name: c-db2oltp-1655862364134421-db2dbconfig
    name: db2dbconfig
  - name: certs-wv-rest
    secret:
      defaultMode: 256
      optional: false
      secretName: c-db2oltp-1655862364134421-certs-wv-rest
  - name: db2u-lic
    secret:
      defaultMode: 256
      optional: false
      secretName: c-db2oltp-1655862364134421-db2u-lic
  - name: sshkeys-db2uadm
    secret:
      defaultMode: 256
      optional: false
      secretName: c-db2oltp-1655862364134421-sshkeys-db2uadm
  - name: instancepassword
    secret:
      defaultMode: 420
      optional: false
      secretName: c-db2oltp-1655862364134421-instancepassword
  - name: sshkeys-db2instusr
    secret:
      defaultMode: 256
      optional: false
      secretName: c-db2oltp-1655862364134421-sshkeys-db2instusr
  - name: sshkeys-db2uhausr
    secret:
      defaultMode: 256
      optional: false
      secretName: c-db2oltp-1655862364134421-sshkeys-db2uhausr
  - name: db2ssl
    secret:
      defaultMode: 420
      optional: false
      secretName: db2oltp-internal-tls
  - name: certs-db2u-api
    secret:
      defaultMode: 420
      optional: false
      secretName: c-db2oltp-1655862364134421-certs-db2u-api
  - name: zen-service-broker-secret
    secret:
      defaultMode: 420
      secretName: zen-service-broker-secret
  - name: account-sandy-db2oltp-1655862364134421-token-gd2rh
    secret:
      defaultMode: 420
      secretName: account-sandy-db2oltp-1655862364134421-token-gd2rh
status:
  conditions:
  - lastProbeTime: null
    lastTransitionTime: "2022-06-22T01:53:12Z"
    status: "True"
    type: Initialized
  - lastProbeTime: null
    lastTransitionTime: "2022-06-22T02:00:26Z"
    status: "True"
    type: Ready
  - lastProbeTime: null
    lastTransitionTime: "2022-06-22T02:00:26Z"
    status: "True"
    type: ContainersReady
  - lastProbeTime: null
    lastTransitionTime: "2022-06-22T01:52:02Z"
    status: "True"
    type: PodScheduled
  containerStatuses:
  - containerID: cri-o://cb7021e43da559bd5ff878460283b261338c145afd5138abc6fd449cea2c4a52
    image: icr.io/db2u/db2u@sha256:0d55343dc4f9b6e9c349da0f35145ebd65e219817a626c2960b046ca266ab394
    imageID: icr.io/db2u/db2u@sha256:0d55343dc4f9b6e9c349da0f35145ebd65e219817a626c2960b046ca266ab394
    lastState: {}
    name: db2u
    ready: true
    restartCount: 0
    started: true
    state:
      running:
        startedAt: "2022-06-22T01:59:54Z"
  hostIP: 18.10.140.156
  initContainerStatuses:
  - containerID: cri-o://bac22e280cbc06a881bd45997c8e464d2a55a29b026248bce9db6beb7354ff39
    image: icr.io/db2u/db2u.tools@sha256:8581008145ffc7abc6ced1d776fd95632b312e67eb383ddf74c4374d470ec149
    imageID: icr.io/db2u/db2u.tools@sha256:8581008145ffc7abc6ced1d776fd95632b312e67eb383ddf74c4374d470ec149
    lastState: {}
    name: init-labels
    ready: true
    restartCount: 0
    state:
      terminated:
        containerID: cri-o://bac22e280cbc06a881bd45997c8e464d2a55a29b026248bce9db6beb7354ff39
        exitCode: 0
        finishedAt: "2022-06-22T01:53:10Z"
        reason: Completed
        startedAt: "2022-06-22T01:53:07Z"
  - containerID: cri-o://ac50fdf7a82427f10d3ce82c2b5dc2886443ae8652e0476ef1347cfe6c4a5bac
    image: icr.io/db2u/db2u.tools@sha256:8581008145ffc7abc6ced1d776fd95632b312e67eb383ddf74c4374d470ec149
    imageID: icr.io/db2u/db2u.tools@sha256:8581008145ffc7abc6ced1d776fd95632b312e67eb383ddf74c4374d470ec149
    lastState: {}
    name: init-kernel
    ready: true
    restartCount: 0
    state:
      terminated:
        containerID: cri-o://ac50fdf7a82427f10d3ce82c2b5dc2886443ae8652e0476ef1347cfe6c4a5bac
        exitCode: 0
        finishedAt: "2022-06-22T01:53:12Z"
        reason: Completed
        startedAt: "2022-06-22T01:53:11Z"
  phase: Running
  podIP: 121.159.0.90
  podIPs:
  - ip: 121.159.0.90
  qosClass: Burstable
  startTime: "2022-06-22T01:52:03Z"

[root@bastion ~]# kubectl explain db2uclusters.spec
KIND:     Db2uCluster
VERSION:  db2u.databases.ibm.com/v1

RESOURCE: spec <Object>

DESCRIPTION:
     Spec defines the desired identities of resource in this set.

FIELDS:
   account	<Object>
     Settings for the service accoount for Db2u pods

   addOns	<Object>

   advOpts	<>

   affinity	<Object>
     If specified, the pod's scheduling constraints

   environment	<Object>
     Environment Db2 settings

   license	<Object>
     A structure to abstract license requirements

   podConfig	<map[string]Object>
     A structure to abstract resource requirements, labels and annotations per
     POD.

   size	<integer> -required-

   storage	<[]Object>

   tolerations	<[]Object>
     If specified, the pod's tolerations.

   version	<string> -required-
     Version The version of Db2 to deploy

   volumeSources	<[]Object>

[root@bastion ~]# kubectl explain db2uclusters.spec.environment
KIND:     Db2uCluster
VERSION:  db2u.databases.ibm.com/v1

RESOURCE: environment <Object>

DESCRIPTION:
     Environment Db2 settings

FIELDS:
   database	<Object>

   dbType	<string>

   fcm	<Object>
     A structure to abstract options to enable Db2 Fast Communication Manager
     (FCM) support.

   instance	<Object>

   ldap	<Object>

   mln	<Object>
     A structure to abstract options to configure Multiple Logical Partition
     (MLN) settings in Db2 MPP.
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


