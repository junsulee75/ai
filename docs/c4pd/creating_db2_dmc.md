---
sidebar_position: 2 
---

# Creating DB2 and DMC instance

Once Db2 and DMC operators related resources are installed and configured on CPD,     
DB2/DMC instances can be created through CP4D web console.      

## Check prerequite resources        

There are multiple types of resources.    
Checking each, the followings will show up.     
The majority of those are operators that helps to configure DB2/DMC instances and catalog/subscription related resources.     

```
[root@api.jscp4d.cp.fyre.ibm.com v4.5]# oc get pod -A  |egrep -i "db2|dmc"
ibm-common-services                                db2u-operator-manager-59f8c88776-ht24v                            1/1     Running     0              14h
ibm-common-services                                ibm-db2oltp-cp4d-operator-controller-manager-58ccdcb6cf-gpbp8     1/1     Running     0              14h
ibm-common-services                                ibm-dmc-controller-manager-6c6b86479f-mqwlm                       1/1     Running     0              13h
openshift-marketplace                              ibm-db2oltp-cp4d-operator-catalog-cpbq6                           1/1     Running     0              14h
openshift-marketplace                              ibm-db2uoperator-catalog-x5pst                                    1/1     Running     0              14h
openshift-marketplace                              ibm-dmc-operator-catalog-tzccn                                    1/1     Running     0              13h
sandy                                              ibm-dmc-addon-api-6894cbf548-jrfks                                1/1     Running     0              13h
sandy                                              ibm-dmc-addon-ui-5567dfd889-5cvcs                                 1/1     Running     0              13h

[root@api.jscp4d.cp.fyre.ibm.com v4.5]# oc get service -A  |egrep -i "db2|dmc"
ibm-common-services                                ibm-db2oltp-cp4d-operator-controller-mngr-metrics-svc      ClusterIP      172.30.177.214   <none>                                 8443/TCP                              14h
openshift-marketplace                              ibm-db2oltp-cp4d-operator-catalog                          ClusterIP      172.30.5.147     <none>                                 50051/TCP                             14h
openshift-marketplace                              ibm-db2uoperator-catalog                                   ClusterIP      172.30.154.78    <none>                                 50051/TCP                             14h
openshift-marketplace                              ibm-dmc-operator-catalog                                   ClusterIP      172.30.141.167   <none>                                 50051/TCP                             13h
sandy                                              ibm-dmc-addon-api                                          ClusterIP      172.30.232.196   <none>                                 5555/TCP,4444/TCP                     13h
sandy                                              ibm-dmc-addon-ui                                           ClusterIP      172.30.194.202   <none>                                 8080/TCP,8443/TCP                     13h

[root@api.jscp4d.cp.fyre.ibm.com v4.5]# oc get deployment -A  |egrep -i "db2|dmc"
ibm-common-services                                db2u-operator-manager                          1/1     1            1           14h
ibm-common-services                                ibm-db2oltp-cp4d-operator-controller-manager   1/1     1            1           14h
ibm-common-services                                ibm-dmc-controller-manager                     1/1     1            1           13h
sandy                                              ibm-dmc-addon-api                              1/1     1            1           13h
sandy                                              ibm-dmc-addon-ui                               1/1     1            1           13h

[root@api.jscp4d.cp.fyre.ibm.com v4.5]# oc get replicaset -A  |egrep -i "db2|dmc"
ibm-common-services                                db2u-operator-manager-59f8c88776                          1         1         1       14h
ibm-common-services                                ibm-db2oltp-cp4d-operator-controller-manager-58ccdcb6cf   1         1         1       14h
ibm-common-services                                ibm-dmc-controller-manager-59ccd76448                     0         0         0       13h
ibm-common-services                                ibm-dmc-controller-manager-6c6b86479f                     1         1         1       13h
sandy                                              ibm-dmc-addon-api-6894cbf548                              1         1         1       13h
sandy                                              ibm-dmc-addon-ui-5567dfd889                               1         1         1       13h
```

## Log on CP4D web console   

After CPD/C4PD installation, you should have the login credential information already.    
If you are not sure or forgot those, you can retrieve the information running the CPD CLI(command line interface command like below example.    

```
# cpd-cli manage get-cpd-instance-details --cpd_instance_ns=sandy --get_admin_initial_credentials=true
CPD Url: cpd-sandy.apps.jscp4d.cp.fyre.ibm.com
CPD Username: admin
CPD Password: xxxxxxxx
[SUCCESS] 2022-08-19T15:57:47.301137Z You may find output and logs in the "/root/cpd_install/v4.5/cpd-cli-workspace/olm-utils-workspace/work" directory.
[SUCCESS] 2022-08-19T15:57:47.301283Z The get-cpd-instance-details command ran successfully.
```

> The tools are available for download from [cpd-cli github page](https://github.com/IBM/cpd-cli/releases).     

Login CP4D web console using the credentials.      

![c4pd login](/img/cp4d_login.png)     

From the hone page, click `View all`  in the `My instance` box.   
![c4pd home](/img/cp4d_home.png)     

The page shows the current instances list.   
![c4pd instance none](/img/cp4d_instance_none.png)     

Click `New instance` at right top to start creating instances.   

## Create DB2 instance    

From the availalbe services, select `Db2`.     

![c4pd select service](/img/cp4d_select_service.png)     

Read the service detail and click `New instance`.    
![c4pd Db2](/img/cp4d_db2.png)     

Select options following the pages and click `Next`.     
The followings are few screen examples.      
Pages detail may change depending on versions.    

![c4pd Db2 configure](/img/cp4d_db2_configure.png)    
... 
![c4pd Db2 system storage](/img/cp4d_db2_sys.png)     
... 

Review the selections and click `create`.    
![c4pd Db2 finalize](/img/cp4d_db2_finalize.png)     

Monitor the progress or coffee time until the completion.   
![c4pd Db2 progress](/img/cp4d_db2_progress.png)     

After success completion, it will show the result as below.     
![c4pd Db2 complete](/img/cp4d_db2_complete.png)     

### Find the DB2 pod name    

Checking db2 related pods, new ones starting with `c-db2oltp` are created.    
```
[root@api.jscp4d.cp.fyre.ibm.com v4.5]# oc get pod -A -o wide  |egrep "^NAMESPACE|db2"
NAMESPACE                                          NAME                                                              READY   STATUS      RESTARTS       AGE    IP              NODE                             NOMINATED NODE   READINESS GATES
ibm-common-services                                db2u-operator-manager-59f8c88776-ht24v                            1/1     Running     1 (165m ago)   19h    10.254.12.14    worker2.jscp4d.cp.fyre.ibm.com   <none>           <none>
ibm-common-services                                ibm-db2oltp-cp4d-operator-controller-manager-58ccdcb6cf-gpbp8     1/1     Running     0              19h    10.254.20.28    worker1.jscp4d.cp.fyre.ibm.com   <none>           <none>
openshift-marketplace                              ibm-db2oltp-cp4d-operator-catalog-cpbq6                           1/1     Running     0              19h    10.254.20.21    worker1.jscp4d.cp.fyre.ibm.com   <none>           <none>
openshift-marketplace                              ibm-db2uoperator-catalog-x5pst                                    1/1     Running     0              19h    10.254.20.19    worker1.jscp4d.cp.fyre.ibm.com   <none>           <none>
sandy                                              c-db2oltp-1660955085042439-db2u-0                                 1/1     Running     0              138m   10.254.16.81    worker0.jscp4d.cp.fyre.ibm.com   <none>           <none>
sandy                                              c-db2oltp-1660955085042439-etcd-0                                 1/1     Running     0              138m   10.254.21.237   worker1.jscp4d.cp.fyre.ibm.com   <none>           <none>
sandy                                              c-db2oltp-1660955085042439-instdb-47mzz                           0/1     Completed   0              139m   10.254.21.236   worker1.jscp4d.cp.fyre.ibm.com   <none>           <none>
sandy                                              c-db2oltp-1660955085042439-restore-morph-cxpcl                    0/1     Completed   0              136m   10.254.21.238   worker1.jscp4d.cp.fyre.ibm.com   <none>           <none>
```

Also `service` resource shows new ones starting with the name convention `c-db2oltp` .    
Relevant port numbers are shown too.  (example, 50000)
```
[root@api.jscp4d.cp.fyre.ibm.com v4.5]# oc get services -A  |egrep "^NAMESPACE|db2"
NAMESPACE                                          NAME                                                       TYPE           CLUSTER-IP       EXTERNAL-IP                            PORT(S)                                                                           AGE
ibm-common-services                                ibm-db2oltp-cp4d-operator-controller-mngr-metrics-svc      ClusterIP      172.30.177.214   <none>                                 8443/TCP                                                                          19h
openshift-marketplace                              ibm-db2oltp-cp4d-operator-catalog                          ClusterIP      172.30.5.147     <none>                                 50051/TCP                                                                         19h
openshift-marketplace                              ibm-db2uoperator-catalog                                   ClusterIP      172.30.154.78    <none>                                 50051/TCP                                                                         19h
sandy                                              c-db2oltp-1660955085042439-db2u                            ClusterIP      172.30.15.219    <none>                                 50000/TCP,50001/TCP,25000/TCP,25001/TCP,25002/TCP,25003/TCP,25004/TCP,25005/TCP   102m
sandy                                              c-db2oltp-1660955085042439-db2u-engn-svc                   NodePort       172.30.41.68     <none>                                 50000:31140/TCP,50001:32325/TCP                                                   102m
sandy                                              c-db2oltp-1660955085042439-db2u-head-engn-svc              NodePort       172.30.231.118   <none>                                 50000:30891/TCP,50001:31123/TCP                                                   102m
sandy                                              c-db2oltp-1660955085042439-db2u-internal                   ClusterIP      None             <none>                                 50000/TCP,9443/TCP,50052/TCP                                                      102m
sandy                                              c-db2oltp-1660955085042439-etcd                            ClusterIP      None             <none>                                 2379/TCP,2380/TCP                                   
```

This is the pod name to access.    
Note the pod is in the namespace `sandy`.      
```
[root@api.jscp4d.cp.fyre.ibm.com v4.5]# oc get pods -A -o wide|egrep "^NAMESPACE|db2u" |grep -v operator
NAMESPACE                                          NAME                                                              READY   STATUS      RESTARTS        AGE     IP              NODE                             NOMINATED NODE   READINESS GATES
sandy                                              c-db2oltp-1660955085042439-db2u-0                                 1/1     Running     0               3h11m   10.254.16.81    worker0.jscp4d.cp.fyre.ibm.com   <none>           <none>
```

### Access to DB2 pod   
```
[root@api.jscp4d.cp.fyre.ibm.com v4.5]# oc -n sandy rsh c-db2oltp-1660955085042439-db2u-0
Defaulted container "db2u" out of: db2u, init-labels (init), init-kernel (init)

sh-4.4$ id
uid=600(db2uadm) gid=10(wheel) groups=10(wheel)

sh-4.4$ su - db2inst1
Last login: Sat Aug 20 03:35:18 UTC 2022

[db2inst1@c-db2oltp-1660955085042439-db2u-0 - Db2U db2inst1]$ db2level
DB21085I  This instance or install (instance name, where applicable: 
"db2inst1") uses "64" bits and DB2 code release "SQL11057" with level 
identifier "0608010F".
Informational tokens are "DB2 v11.5.7.0", "s2206301309", "DYN2206301309AMD64", 
and Fix Pack "0".
Product is installed at "/opt/ibm/db2/V11.5.0.0".

[db2inst1@c-db2oltp-1660955085042439-db2u-0 - Db2U db2inst1]$ db2 list active databases

                           Active Databases

Database name                              = BLUDB
Applications connected currently           = 0
Database path                              = /mnt/bludata0/db2/databases/db2inst1/NODE0000/SQL00001/MEMBER0000/

[db2inst1@c-db2oltp-1660955085042439-db2u-0 - Db2U db2inst1]$ db2 connect to BLUDB

   Database Connection Information

 Database server        = DB2/LINUXX8664 11.5.7.0
 SQL authorization ID   = DB2INST1
 Local database alias   = BLUDB
```

## Create DMC instance    

From the hone page, click `View all`  in the `My instance` box.  
![c4pd home db2](/img/cp4d_home_db2.png)     

The page shows the current instances list.   
Here we have one Db2 instance list.     
Click `New instance` at right top to start creating instances.   
![c4pd instance db2](/img/cp4d_instance_db2.png)     

From the availalbe services, select `Db2 Data Management Console`.     
![c4pd select service](/img/cp4d_select_service.png)      

Read the service detail and click `New instance`.   
![c4pd dmc](/img/cp4d_dmc.png)   

elect options following the pages and click `Next`.     
![c4pd dmc compute](/img/cp4d_dmc_compute.png)   
![c4pd dmc storage](/img/cp4d_dmc_storage.png)   

Review the selections and click `create`.    
![c4pd dmc summary](/img/cp4d_dmc_summary.png)     

Monitor the progress or coffee time until the completion.    
The DMC instance will show up after a couple of minutes.    
![c4pd dmc progress](/img/cp4d_dmc_progress.png)   

New resouraces are created related to `DMC`.     
```
[root@api.jscp4d.cp.fyre.ibm.com v4.5]# oc get pod -A  -o wide |egrep "^NAMESPACE|dmc" |egrep -v "ibm-dmc-addon|ibm-dmc-operator|ibm-dmc-operator-catalog|ibm-dmc-controller-manager"
NAMESPACE                                          NAME                                                              READY   STATUS              RESTARTS        AGE     IP              NODE                             NOMINATED NODE   READINESS GATES
sandy                                              c-ibm-dmc-1660970269526367-redis-m-0                              4/4     Running             0               8m33s   10.254.22.102   worker1.jscp4d.cp.fyre.ibm.com   <none>           <none>
sandy                                              c-ibm-dmc-1660970269526367-redis-m-1                              4/4     Running             0               8m33s   10.254.12.120   worker2.jscp4d.cp.fyre.ibm.com   <none>           <none>
sandy                                              c-ibm-dmc-1660970269526367-redis-m-2                              4/4     Running             0               8m33s   10.254.16.84    worker0.jscp4d.cp.fyre.ibm.com   <none>           <none>
sandy                                              c-ibm-dmc-1660970269526367-redis-s-0                              4/4     Running             0               6m31s   10.254.12.124   worker2.jscp4d.cp.fyre.ibm.com   <none>           <none>
sandy                                              c-ibm-dmc-1660970269526367-redis-s-1                              4/4     Running             0               6m31s   10.254.22.107   worker1.jscp4d.cp.fyre.ibm.com   <none>           <none>
sandy                                              c-ibm-dmc-1660970269526367-redis-s-2                              4/4     Running             0               6m31s   10.254.16.85    worker0.jscp4d.cp.fyre.ibm.com   <none>           <none>
sandy                                              ibm-dmc-1660970269526367-admin-578c4fd74-85pcq                    1/1     Running             0               8m29s   10.254.22.103   worker1.jscp4d.cp.fyre.ibm.com   <none>           <none>
sandy                                              ibm-dmc-1660970269526367-admin-578c4fd74-rfj8c                    1/1     Running             0               8m29s   10.254.12.121   worker2.jscp4d.cp.fyre.ibm.com   <none>           <none>
sandy                                              ibm-dmc-1660970269526367-dbapi-5f4b76d846-jwz2x                   1/1     Running             0               8m43s   10.254.22.101   worker1.jscp4d.cp.fyre.ibm.com   <none>           <none>
sandy                                              ibm-dmc-1660970269526367-dbapi-5f4b76d846-kxdwl                   1/1     Running             0               8m43s   10.254.12.119   worker2.jscp4d.cp.fyre.ibm.com   <none>           <none>
sandy                                              ibm-dmc-1660970269526367-explain-659857fcdb-5xfmm                 1/1     Running             0               7m56s   10.254.12.122   worker2.jscp4d.cp.fyre.ibm.com   <none>           <none>
sandy                                              ibm-dmc-1660970269526367-job-scheduler-794495798-jlxwg            1/1     Running             0               8m56s   10.254.12.117   worker2.jscp4d.cp.fyre.ibm.com   <none>           <none>
sandy                                              ibm-dmc-1660970269526367-monitor-0                                1/1     Running             0               7m37s   10.254.22.105   worker1.jscp4d.cp.fyre.ibm.com   <none>           <none>
sandy                                              ibm-dmc-1660970269526367-nginx-7d67d6bb86-qst74                   1/1     Running             0               7m30s   10.254.12.123   worker2.jscp4d.cp.fyre.ibm.com   <none>           <none>
sandy                                              ibm-dmc-1660970269526367-nginx-7d67d6bb86-wglxv                   1/1     Running             0               7m30s   10.254.22.106   worker1.jscp4d.cp.fyre.ibm.com   <none>           <none>
sandy                                              ibm-dmc-1660970269526367-registry-manager-65f5cf6bd9-lzldc        1/1     Running             0               9m9s    10.254.12.116   worker2.jscp4d.cp.fyre.ibm.com   <none>           <none>
sandy                                              ibm-dmc-1660970269526367-runsql-0                                 1/1     Running             0               8m10s   10.254.22.104   worker1.jscp4d.cp.fyre.ibm.com   <none>           <none>
[root@api.jscp4d.cp.fyre.ibm.com v4.5]# oc get service -A  -o wide |egrep "^NAMESPACE|dmc" |egrep -v "ibm-dmc-addon|ibm-dmc-operator|ibm-dmc-operator-catalog|ibm-dmc-controller-manager"
NAMESPACE                                          NAME                                                       TYPE           CLUSTER-IP       EXTERNAL-IP                            PORT(S)                                                                           AGE     SELECTOR
sandy                                              c-ibm-dmc-1660970269526367-redis-m                         ClusterIP      None             <none>                                 15000/TCP,16000/TCP                                                               10m     formation_id=ibm-dmc-1660970269526367-redis,role=m
sandy                                              c-ibm-dmc-1660970269526367-redis-m-metrics                 ClusterIP      None             <none>                                 9000/TCP                                                                          10m     formation_id=ibm-dmc-1660970269526367-redis,role=m
sandy                                              c-ibm-dmc-1660970269526367-redis-p                         ClusterIP      None             <none>                                 16000/TCP                                                                         10m     cluster_role=leader,formation_id=ibm-dmc-1660970269526367-redis
sandy                                              c-ibm-dmc-1660970269526367-redis-s                         ClusterIP      None             <none>                                 9000/TCP,26379/TCP,15000/TCP                                                      10m     formation_id=ibm-dmc-1660970269526367-redis,role=s
sandy                                              ibm-dmc-1660970269526367-admin                             ClusterIP      172.30.109.185   <none>                                 8443/TCP                                                                          10m     app=dmc,component=admin,release=1660970269526367
sandy                                              ibm-dmc-1660970269526367-dbapi                             ClusterIP      172.30.104.158   <none>                                 8443/TCP                                                                          10m     app=dmc,component=dbapi,release=1660970269526367
sandy                                              ibm-dmc-1660970269526367-explain                           ClusterIP      172.30.120.65    <none>                                 8443/TCP                                                                          9m44s   app=dmc,component=explain,release=1660970269526367
sandy                                              ibm-dmc-1660970269526367-job-scheduler                     ClusterIP      172.30.167.208   <none>                                 8443/TCP                                                                          10m     app=dmc,component=job_scheduler,release=1660970269526367
sandy                                              ibm-dmc-1660970269526367-monitor                           ClusterIP      172.30.78.86     <none>                                 8443/TCP                                                                          9m26s   app=dmc,component=monitor,release=1660970269526367
sandy                                              ibm-dmc-1660970269526367-monitor-stateful                  ClusterIP      None             <none>                                 8443/TCP                                                                          9m26s   app=dmc,component=monitor,release=1660970269526367
sandy                                              ibm-dmc-1660970269526367-nginx                             ClusterIP      172.30.101.205   <none>                                 8443/TCP                                                                          9m4s    app=dmc,component=nginx,release=1660970269526367
sandy                                              ibm-dmc-1660970269526367-registry-manager                  ClusterIP      172.30.242.35    <none>                                 8443/TCP                                                                          10m     app=dmc,component=registry_manager,release=1660970269526367
sandy                                              ibm-dmc-1660970269526367-runsql                            ClusterIP      172.30.40.120    <none>                                 8443/TCP                                                                          9m58s   app=dmc,component=runsql,release=1660970269526367
sandy                                              ibm-dmc-1660970269526367-runsql-stateful                   ClusterIP      None             <none>                                 8443/TCP                                                                          9m48s   app=dmc,component=runsql,release=1660970269526367
[root@api.jscp4d.cp.fyre.ibm.com v4.5]# oc get deployment -A  -o wide |egrep "^NAMESPACE|dmc" |egrep -v "ibm-dmc-addon|ibm-dmc-operator|ibm-dmc-operator-catalog|ibm-dmc-controller-manager"
NAMESPACE                                          NAME                                           READY   UP-TO-DATE   AVAILABLE   AGE   CONTAINERS                                                                                                IMAGES                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      SELECTOR
sandy                                              ibm-dmc-1660970269526367-admin                 2/2     2            2           11m   uc-admin                                                                                                  cp.icr.io/cp/cpd/ibm-dmc-admin@sha256:b41791fdc1403ab8942d3a1897ac2c14f383cd156978dcb57e42f19236a0074a                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      app=dmc,canary=false,component=admin,release=1660970269526367
sandy                                              ibm-dmc-1660970269526367-dbapi                 2/2     2            2           11m   uc-dbapi                                                                                                  cp.icr.io/cp/cpd/ibm-dmc-dbapi@sha256:8132e6cecfc135f851ca85c75a1ead4d5059dcfbee665dee375daa7f7b67b4d4                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      app=dmc,canary=false,component=dbapi,release=1660970269526367
sandy                                              ibm-dmc-1660970269526367-explain               1/1     1            1           10m   uc-explain                                                                                                cp.icr.io/cp/cpd/ibm-dmc-explain@sha256:4190a3d0c4fa306d7e8509ba35692c39dc234820aa9ac9f1dead0ca567b72e05                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    app=dmc,canary=false,component=explain,release=1660970269526367
sandy                                              ibm-dmc-1660970269526367-job-scheduler         1/1     1            1           11m   uc-job-scheduler                                                                                          cp.icr.io/cp/cpd/ibm-dmc-job-scheduler@sha256:819e0eb2b8d84b1cfda4b07d435b2b2a77015779d28c5eaca28dcad9478835cc                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              app=dmc,component=job_scheduler,release=1660970269526367
sandy                                              ibm-dmc-1660970269526367-nginx                 2/2     2            2           10m   uc-nginx                                                                                                  cp.icr.io/cp/cpd/ibm-dmc-nginx@sha256:a8f6b7bb23e40cc53fe55369eaa9bc5d874c51a2e12287afaf4ac3cd1d53dc46                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      app=dmc,component=nginx,release=1660970269526367
sandy                                              ibm-dmc-1660970269526367-registry-manager      1/1     1            1           11m   uc-registry-manager                                                                                       cp.icr.io/cp/cpd/ibm-dmc-registry-manager@sha256:c5e5b2f43714da383c878ca43a6606fa07484b19fc02a300604284855c51ef08                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           app=dmc,component=registry_manager,release=1660970269526367
[root@api.jscp4d.cp.fyre.ibm.com v4.5]# oc get replicaset -A  -o wide |egrep "^NAMESPACE|dmc" |egrep -v "ibm-dmc-addon|ibm-dmc-operator|ibm-dmc-operator-catalog|ibm-dmc-controller-manager"
NAMESPACE                                          NAME                                                      DESIRED   CURRENT   READY   AGE     CONTAINERS                                                                                                IMAGES                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      SELECTOR
sandy                                              ibm-dmc-1660970269526367-admin-578c4fd74                  2         2         2       11m     uc-admin                                                                                                  cp.icr.io/cp/cpd/ibm-dmc-admin@sha256:b41791fdc1403ab8942d3a1897ac2c14f383cd156978dcb57e42f19236a0074a                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      app=dmc,canary=false,component=admin,pod-template-hash=578c4fd74,release=1660970269526367
sandy                                              ibm-dmc-1660970269526367-dbapi-5f4b76d846                 2         2         2       11m     uc-dbapi                                                                                                  cp.icr.io/cp/cpd/ibm-dmc-dbapi@sha256:8132e6cecfc135f851ca85c75a1ead4d5059dcfbee665dee375daa7f7b67b4d4                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      app=dmc,canary=false,component=dbapi,pod-template-hash=5f4b76d846,release=1660970269526367
sandy                                              ibm-dmc-1660970269526367-explain-659857fcdb               1         1         1       11m     uc-explain                                                                                                cp.icr.io/cp/cpd/ibm-dmc-explain@sha256:4190a3d0c4fa306d7e8509ba35692c39dc234820aa9ac9f1dead0ca567b72e05                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    app=dmc,canary=false,component=explain,pod-template-hash=659857fcdb,release=1660970269526367
sandy                                              ibm-dmc-1660970269526367-job-scheduler-794495798          1         1         1       12m     uc-job-scheduler                                                                                          cp.icr.io/cp/cpd/ibm-dmc-job-scheduler@sha256:819e0eb2b8d84b1cfda4b07d435b2b2a77015779d28c5eaca28dcad9478835cc                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              app=dmc,component=job_scheduler,pod-template-hash=794495798,release=1660970269526367
sandy                                              ibm-dmc-1660970269526367-nginx-7d67d6bb86                 2         2         2       10m     uc-nginx                                                                                                  cp.icr.io/cp/cpd/ibm-dmc-nginx@sha256:a8f6b7bb23e40cc53fe55369eaa9bc5d874c51a2e12287afaf4ac3cd1d53dc46                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      app=dmc,component=nginx,pod-template-hash=7d67d6bb86,release=1660970269526367
sandy                                              ibm-dmc-1660970269526367-registry-manager-65f5cf6bd9      1         1         1       12m     uc-registry-manager                                                                                       cp.icr.io/cp/cpd/ibm-dmc-registry-manager@sha256:c5e5b2f43714da383c878ca43a6606fa07484b19fc02a300604284855c51ef08                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           app=dmc,component=registry_manager,pod-template-hash=65f5cf6bd9,release=1660970269526367
```

Once DMC is created, CP4D pages shows the status as `green` and open DMC page.    

![c4pd dmc created](/img/cp4d_dmc_after_creation.png)    

![c4pd dmc main page](/img/cp4d_dmc_page1.png)     

![c4pd dmc menu](/img/cp4d_dmc_page_menu.png)     

