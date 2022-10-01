---
sidebar_position:  4
---

# Install Db2 on Red Hat Openshift

If you are using CP4D (Client Pak for Data), refer [Db2 on Cloud Pak for Data](https://www.ibm.com/docs/en/cloud-paks/cp-data/4.5.x?topic=services-db2) page to install Db2 service.    
This page describes steps to install DB2 service on Openshift manually apart from CP4D.     
However, technical detail is similar using `Db2 operator`.         
Before deploying Db2 service, `Db2 operator` needs to be installed in advance.      
If you have the operator already in your OCP, you can go skip `Db2 operator` installation and go ahead deploying `Db2 service`.      

The steps here is based on DB2 Knowledge center page [Reference maual](https://www.ibm.com/docs/en/db2/11.5?topic=1157-installing-db2)      
and also refer to [Compatibility](https://www.ibm.com/docs/en/db2/11.5?topic=deployments-db2-red-hat-openshift) for Db2 operator versions and DB2 versions.     

Steps here start from an empty Red Hat openshift where there are no IBM/Db2 related resources.     

## Install Db2 Operator

### Enable IBM operator     
`Db2 operator` is the part `IBM operator`. Therefore, enable `IBM operator` first.     

Click `+` button at the right top and paste the following yaml, then `Create`.      


```yaml
apiVersion: operators.coreos.com/v1alpha1
kind: CatalogSource
metadata:
  name: ibm-operator-catalog
  namespace: openshift-marketplace
spec:
  displayName: "IBM Operator Catalog" 
  publisher: IBM
  sourceType: grpc
  image: icr.io/cpopen/ibm-operator-catalog
  updateStrategy:
    registryPoll:
      interval: 45m
```

![Enable IBM operator](/img/db2ocp_ibmop.png)  


`IBM Operator` is created.  

![Enable IBM operator result](/img/db2ocp_ibmop2.png)  

`Provider` menu will show `IBM Operator` catalogue that includes `Db2 operator`.     

![Enable IBM operator catalogue](/img/db2ocp_ibmop_catalog.png)  


Check if `IBM operator` is enabled.    

```
[root@api.jscp4d.cp.fyre.ibm.com ~]# oc get all -A |grep -i operator |grep -i ibm
openshift-marketplace                              pod/ibm-operator-catalog-2klhk                                      1/1     Running     0               6m7s
openshift-marketplace                              service/ibm-operator-catalog                       ClusterIP      172.30.42.206    <none>                                 50051/TCP                             6m7s
```

```
[root@api.jscp4d.cp.fyre.ibm.com ~]# oc get CatalogSources ibm-operator-catalog -n openshift-marketplace
NAME                   DISPLAY                TYPE   PUBLISHER   AGE
ibm-operator-catalog   IBM Operator Catalog   grpc   IBM         24m
```

```
[root@api.jscp4d.cp.fyre.ibm.com ~]# oc get catalogsource,pods -n openshift-marketplace
NAME                                                      DISPLAY                TYPE   PUBLISHER   AGE
catalogsource.operators.coreos.com/certified-operators    Certified Operators    grpc   Red Hat     4h24m
catalogsource.operators.coreos.com/community-operators    Community Operators    grpc   Red Hat     4h24m
catalogsource.operators.coreos.com/ibm-operator-catalog   IBM Operator Catalog   grpc   IBM         27m
catalogsource.operators.coreos.com/redhat-marketplace     Red Hat Marketplace    grpc   Red Hat     4h24m
catalogsource.operators.coreos.com/redhat-operators       Red Hat Operators      grpc   Red Hat     4h24m

NAME                                        READY   STATUS    RESTARTS        AGE
pod/certified-operators-5fp5l               1/1     Running   0               4h24m
pod/community-operators-z42q9               1/1     Running   0               4h24m
pod/ibm-operator-catalog-2klhk              1/1     Running   0               27m
pod/marketplace-operator-5bd7c86474-hjwk2   1/1     Running   1 (4h18m ago)   4h27m
pod/redhat-marketplace-gdmsl                1/1     Running   0               4h6m
pod/redhat-operators-xrwlk                  1/1     Running   0               4h24m
```

### Install Db2 operator

Find `Db2 operator` from IBM operator catalogue.   

![Find Db2 operator](/img/db2ocp_db2op1.png)  

Install `Db2 operator` .    

![Install Db2 operator](/img/db2ocp_db2op2.png)   

![Install Db2 operator](/img/db2ocp_db2op3.png)    

Red Hat openshift console page shows the progress. Wait until it's ready. (Expect it takes few minutes.)     

![Install Db2 operator](/img/db2ocp_db2op4.png)   

![Install Db2 operator](/img/db2ocp_db2op5.png)    

![Install Db2 operator](/img/db2ocp_db2op6.png)    

Once finished, `Installed Operator` shows `Db2 operator`.     

![Install Db2 operator](/img/db2ocp_db2op7.png)    

![Install Db2 operator](/img/db2ocp_db2op8.png)    

![Install Db2 operator](/img/db2ocp_db2op9.png)    


Check if the subscription is configured and  `db2u-operator` is running.      

```
[root@api.jscp4d.cp.fyre.ibm.com util]#  oc get sub -A
NAMESPACE             NAME            PACKAGE         SOURCE                 CHANNEL
openshift-operators   db2u-operator   db2u-operator   ibm-operator-catalog   v2.1
```

```
[root@api.jscp4d.cp.fyre.ibm.com ~]# oc get all -A |grep -i db2
openshift-operators                                pod/db2u-operator-manager-7c86548cd8-c8gkw                            1/1     Running     0               6m40s
openshift-operators                                deployment.apps/db2u-operator-manager                       1/1     1            1           6m40s
openshift-operators                                replicaset.apps/db2u-operator-manager-7c86548cd8                       1         1         1       6m40s
```


## Deploy Db2 service

### Create a storage class      
If there is no configured storage class resource, Db2 deployement will fail waiting for a storage class to be bound.     
Therefore create a storage class.    

You can check if there is a definned storage class.      
In this example, there is one `managed-nfs-storage` ready.       

```
[root@api.jscp4d.cp.fyre.ibm.com util]# oc get sc -A
NAME                  PROVISIONER                                   RECLAIMPOLICY   VOLUMEBINDINGMODE   ALLOWVOLUMEEXPANSION   AGE
managed-nfs-storage   k8s-sigs.io/nfs-subdir-external-provisioner   Delete          Immediate           false                  21m
```

### Deploy Db2 service using `Db2UClusetrs` api    

Db2 operator page on Red Hat web console provides the interface to prepare yaml input to `Db2UClusters` api.           

You can check the API specs.    
```
[root@api.jscp4d.cp.fyre.ibm.com ~]# oc api-resources  |egrep -i "^NAME|db2"
NAME                                  SHORTNAMES          APIVERSION                                    NAMESPACED   KIND
namespaces                            ns                  v1                                            false        Namespace
bigsqls                                                   db2u.databases.ibm.com/v1alpha1               true         BigSQL
db2uclusters                          db2u                db2u.databases.ibm.com/v1                     true         Db2uCluster    <=========
db2uhadrs                                                 db2u.databases.ibm.com/v1alpha1               true         Db2uHadr
db2uhelmmigrations                                        db2u.databases.ibm.com/v1alpha1               true         Db2uHelmMigration
formationlocks                                            db2u.databases.ibm.com/v1                     true         FormationLock
formations                                                db2u.databases.ibm.com/v1                     true         Formation

[root@api.jscp4d.cp.fyre.ibm.com ~]# kubectl explain db2u
KIND:     Db2uCluster
VERSION:  db2u.databases.ibm.com/v1

DESCRIPTION:
..

[root@api.jscp4d.cp.fyre.ibm.com ~]# kubectl explain db2u.spec
KIND:     Db2uCluster
VERSION:  db2u.databases.ibm.com/v1

RESOURCE: spec <Object>

DESCRIPTION:
     <empty>

FIELDS:
   account	<Object>

   addOns	<Object>

   advOpts	<>

   affinity	<Object>

   environment	<Object>

   license	<Object>

   podConfig	<map[string]Object>

   size	<integer> -required-

   storage	<[]Object>

   tolerations	<[]Object>

   vaults	<[]Object>

   version	<string> -required-

   volumeSources	<[]Object>

```

Click `Create instance`.   


![Deploy Db2](/img/db2ocp_db21.png)    

Fill in and select preferences in each section.   

![Deploy Db2](/img/db2ocp_db22.png)     

Select the license agreement.    
![Deploy Db2](/img/db2ocp_db23.png)    

Configure `Storage`.    
This section is about creating `Persistent Volumes Claim(PVC)`.     
If not specified, it will create a default claim.    
However, there should be a storage class to be bound in advance.     

![Deploy Db2](/img/db2ocp_db24.png)    

Once selected all sections, review `YAML view` then `Create` if all are good to go.      

![Deploy Db2](/img/db2ocp_db25.png)    

Then Red Hat console page shows the progress.     

![Deploy Db2](/img/db2ocp_db26.png)    

![Deploy Db2](/img/db2ocp_db27.png)    


On bastian infrastructure node, monitor Db2 related resources to be `Running` status.    

   
```
[root@api.jscp4d.cp.fyre.ibm.com util]# oc get all -A |grep -i db2
openshift-operators                                pod/c-db2ucluster-sample-db2u-0                                       1/1     Running     0               20m
openshift-operators                                pod/c-db2ucluster-sample-etcd-0                                       1/1     Running     0               20m
openshift-operators                                pod/c-db2ucluster-sample-instdb-sdsj4                                 0/1     Completed   0               51m
openshift-operators                                pod/c-db2ucluster-sample-ldap-6b84c4c556-kbdvc                        1/1     Running     0               51m
openshift-operators                                pod/c-db2ucluster-sample-restore-morph-n2qdk                          0/1     Completed   0               12m
openshift-operators                                pod/db2u-operator-manager-7c86548cd8-c8gkw                            1/1     Running     0               116m
openshift-operators                                service/c-db2ucluster-sample-db2u                  ClusterIP      172.30.34.225    <none>                                 50000/TCP,50001/TCP,25000/TCP,25001/TCP,25002/TCP,25003/TCP,25004/TCP,25005/TCP   20m
openshift-operators                                service/c-db2ucluster-sample-db2u-engn-svc         NodePort       172.30.202.128   <none>                                 50000:31389/TCP,50001:30679/TCP                                                   20m
openshift-operators                                service/c-db2ucluster-sample-db2u-head-engn-svc    NodePort       172.30.48.134    <none>                                 50000:31521/TCP,50001:32330/TCP                                                   20m
openshift-operators                                service/c-db2ucluster-sample-db2u-internal         ClusterIP      None             <none>                                 50000/TCP,9443/TCP,50052/TCP                                                      20m
openshift-operators                                service/c-db2ucluster-sample-etcd                  ClusterIP      None             <none>                                 2379/TCP,2380/TCP                                                                 20m
openshift-operators                                service/c-db2ucluster-sample-ldap                  ClusterIP      172.30.121.103   <none>                                 50389/TCP                                                                         51m
openshift-operators                                deployment.apps/c-db2ucluster-sample-ldap                   1/1     1            1           51m
openshift-operators                                deployment.apps/db2u-operator-manager                       1/1     1            1           116m
openshift-operators                                replicaset.apps/c-db2ucluster-sample-ldap-6b84c4c556                   1         1         1       51m
openshift-operators                                replicaset.apps/db2u-operator-manager-7c86548cd8                       1         1         1       116m
openshift-operators    statefulset.apps/c-db2ucluster-sample-db2u   1/1     20m
openshift-operators    statefulset.apps/c-db2ucluster-sample-etcd   1/1     20m
openshift-operators                    job.batch/c-db2ucluster-sample-instdb                                       1/1           30m        51m
openshift-operators                    job.batch/c-db2ucluster-sample-restore-morph                                1/1           3m19s      12m


[root@api.jscp4d.cp.fyre.ibm.com ~]# kubectl get all --show-labels |grep db2u
pod/c-db2ucluster-sample-db2u-0                  1/1     Running     0          23h   app=db2ucluster-sample,component=db2oltp,controller-revision-hash=c-db2ucluster-sample-db2u-799d4c48bc,formation_id=db2ucluster-sample,name=dashmpp-head-0,role=db,statefulset.kubernetes.io/pod-name=c-db2ucluster-sample-db2u-0,type=engine
...

[root@api.jscp4d.cp.fyre.ibm.com ~]# kubectl get all --selector app=db2ucluster-s
NAME                                             READY   STATUS      RESTARTS   AGE
pod/c-db2ucluster-sample-db2u-0                  1/1     Running     0          23h
pod/c-db2ucluster-sample-etcd-0                  1/1     Running     0          23h
pod/c-db2ucluster-sample-instdb-sdsj4            0/1     Completed   0          24h
pod/c-db2ucluster-sample-ldap-6b84c4c556-kbdvc   1/1     Running     0          24h
pod/c-db2ucluster-sample-restore-morph-n2qdk     0/1     Completed   0          23h

NAME                                              TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)                                                                           AGE
service/c-db2ucluster-sample-db2u                 ClusterIP   172.30.34.225    <none>        50000/TCP,50001/TCP,25000/TCP,25001/TCP,25002/TCP,25003/TCP,25004/TCP,25005/TCP   23h
service/c-db2ucluster-sample-db2u-engn-svc        NodePort    172.30.202.128   <none>        50000:31389/TCP,50001:30679/TCP                                                   23h
service/c-db2ucluster-sample-db2u-head-engn-svc   NodePort    172.30.48.134    <none>        50000:31521/TCP,50001:32330/TCP                                                   23h
service/c-db2ucluster-sample-db2u-internal        ClusterIP   None             <none>        50000/TCP,9443/TCP,50052/TCP                                                      23h
service/c-db2ucluster-sample-etcd                 ClusterIP   None             <none>        2379/TCP,2380/TCP                                                                 23h
service/c-db2ucluster-sample-ldap                 ClusterIP   172.30.121.103   <none>        50389/TCP                                                                         24h

NAME                                        READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/c-db2ucluster-sample-ldap   1/1     1            1           24h

NAME                                                   DESIRED   CURRENT   READY   AGE
replicaset.apps/c-db2ucluster-sample-ldap-6b84c4c556   1         1         1       24h

NAME                                         READY   AGE
statefulset.apps/c-db2ucluster-sample-db2u   1/1     23h
statefulset.apps/c-db2ucluster-sample-etcd   1/1     23h

NAME                                           COMPLETIONS   DURATION   AGE
job.batch/c-db2ucluster-sample-instdb          1/1           30m        24h
job.batch/c-db2ucluster-sample-restore-morph   1/1           3m19s      23h

```

In this example, `c-db2ucluster-sample-db2u-0` is the database resource.      
Check the history of the creation.    
It shows the actual running worker node and last events.     

```yaml
[root@api.jscp4d.cp.fyre.ibm.com util]# oc describe pod c-db2ucluster-sample-db2u-0
Name:         c-db2ucluster-sample-db2u-0
Namespace:    openshift-operators
Priority:     0
Node:         worker2.jscp4d.cp.fyre.ibm.com/10.17.29.5     <====
Start Time:   Thu, 15 Sep 2022 23:10:47 -0700
Labels:       app=db2ucluster-sample
              component=db2oltp
              controller-revision-hash=c-db2ucluster-sample-db2u-799d4c48bc
              formation_id=db2ucluster-sample
              name=dashmpp-head-0
              role=db
              statefulset.kubernetes.io/pod-name=c-db2ucluster-sample-db2u-0
              type=engine
Annotations:  k8s.v1.cni.cncf.io/network-status:
                [{
                    "name": "openshift-sdn",
                    "interface": "eth0",
                    "ips": [
                        "10.254.20.11"
                    ],
                    "default": true,
                    "dns": {}
                }]
              k8s.v1.cni.cncf.io/networks-status:
                [{
                    "name": "openshift-sdn",
                    "interface": "eth0",
                    "ips": [
                        "10.254.20.11"
                    ],
                    "default": true,
                    "dns": {}
                }]
              openshift.io/scc: openshift-operators-c-db2ucluster-sample-scc
Status:       Running
IP:           10.254.20.11
IPs:
  IP:           10.254.20.11
Controlled By:  StatefulSet/c-db2ucluster-sample-db2u
Init Containers:
  init-labels:
    Container ID:  cri-o://80ee2e53f6588f78362cf8060aa9c57ab4ec578be9bf64e478b649a0c171eb0b
    Image:         icr.io/db2u/db2u.tools@sha256:29dbf32fc8ac1e7cb019d0caa3cce5616ecc23a87e329b7c73be9f9abde743be
    Image ID:      icr.io/db2u/db2u.tools@sha256:29dbf32fc8ac1e7cb019d0caa3cce5616ecc23a87e329b7c73be9f9abde743be
    Port:          <none>
    Host Port:     <none>
    Command:
      bash
      -ec
      /tools/pre-install/db2u_init.sh ${MLN_TOTAL} ${REPLICAS}
    State:          Terminated
      Reason:       Completed
      Exit Code:    0
      Started:      Thu, 15 Sep 2022 23:11:57 -0700
      Finished:     Thu, 15 Sep 2022 23:11:59 -0700
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
      SERVICENAME:                c-db2ucluster-sample-db2u
      DB2TYPE:                    db2oltp
      POD_NAME:                   c-db2ucluster-sample-db2u-0 (v1:metadata.name)
      POD_NAMESPACE:              openshift-operators (v1:metadata.namespace)
      MLN_TOTAL:                  1
      REPLICAS:                   1
      SERVICE_NAME:               c-db2ucluster-sample-db2u-internal
      DB2U_API_ENDPOINT:          c-db2ucluster-sample-db2u-internal.openshift-operators.svc:50052
      DB2U_API_DATABASE_BACKEND:  k8s
      DB2U_API_CONFIGMAP_NAME:    c-db2ucluster-sample-db2u-api
      DB2U_API_KEY_FILE:          /secrets/certs/db2u-api/tls.key
      DB2U_API_CERT_FILE:         /secrets/certs/db2u-api/tls.crt
    Mounts:
      /mnt/blumeta0 from data (rw)
      /mnt/blumeta0/configmap/db2u from db2uconfig (ro)
      /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-7c8cn (ro)
  init-kernel:
    Container ID:  cri-o://af22ea1b885c491779bb6e30bff412e44567d9fff856b13c7072e2429da90812
    Image:         icr.io/db2u/db2u.tools@sha256:29dbf32fc8ac1e7cb019d0caa3cce5616ecc23a87e329b7c73be9f9abde743be
    Image ID:      icr.io/db2u/db2u.tools@sha256:29dbf32fc8ac1e7cb019d0caa3cce5616ecc23a87e329b7c73be9f9abde743be
    Port:          <none>
    Host Port:     <none>
    Command:
      bash
      -ec
      /tools/pre-install/set_kernel_params.sh
    State:          Terminated
      Reason:       Completed
      Exit Code:    0
      Started:      Thu, 15 Sep 2022 23:12:00 -0700
      Finished:     Thu, 15 Sep 2022 23:12:00 -0700
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
      SERVICENAME:                c-db2ucluster-sample-db2u
      POD_NAME:                   c-db2ucluster-sample-db2u-0 (v1:metadata.name)
      POD_NAMESPACE:              openshift-operators (v1:metadata.namespace)
      MEMORY_LIMIT:               268435456 (limits.memory)
      SERVICE_NAME:               c-db2ucluster-sample-db2u-internal
      DB2U_API_ENDPOINT:          c-db2ucluster-sample-db2u-internal.openshift-operators.svc:50052
      DB2U_API_DATABASE_BACKEND:  k8s
      DB2U_API_CONFIGMAP_NAME:    c-db2ucluster-sample-db2u-api
      DB2U_API_KEY_FILE:          /secrets/certs/db2u-api/tls.key
      DB2U_API_CERT_FILE:         /secrets/certs/db2u-api/tls.crt
    Mounts:
      /host/proc from proc (rw)
      /mnt/blumeta0 from data (rw)
      /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-7c8cn (ro)
Containers:
  db2u:
    Container ID:   cri-o://1d7f212ce718d88181369e5a4dfcd46b1929be4d1b18d64d554d1b3d0a12f666
    Image:          icr.io/db2u/db2u@sha256:19c7cde0ff5a94091566f0b7cec85f692e8060efdf82975598d1c9ffe35ef7ec
    Image ID:       icr.io/db2u/db2u@sha256:19c7cde0ff5a94091566f0b7cec85f692e8060efdf82975598d1c9ffe35ef7ec
    Ports:          50000/TCP, 50001/TCP, 50052/TCP
    Host Ports:     0/TCP, 0/TCP, 0/TCP
    State:          Running
      Started:      Thu, 15 Sep 2022 23:17:43 -0700
    Ready:          True
    Restart Count:  0
    Limits:
      cpu:                2
      ephemeral-storage:  4Gi
      memory:             4Gi
    Requests:
      cpu:                2
      ephemeral-storage:  2Gi
      memory:             4Gi
    Readiness:            exec [su - db2inst1 -c timeout 5 ssh -p 50022 -o StrictHostKeyChecking=no db2inst1@${HOSTNAME} -- date] delay=20s timeout=10s period=20s #success=1 #failure=50
    Environment:
      POD:                         (v1:metadata.labels['name'])
      POD_NAME:                   c-db2ucluster-sample-db2u-0 (v1:metadata.name)
      POD_NAMESPACE:              openshift-operators (v1:metadata.namespace)
      MEMORY_REQUEST:             4294967296 (requests.memory)
      MEMORY_LIMIT:               4294967296 (limits.memory)
      CPU_LIMIT:                  2 (limits.cpu)
      etcdoperator:               true
      WV_RECOVERY:                partial
      WV_HACLASS:                 UDB
      ETCD_ENDPOINTS:             http://c-db2ucluster-sample-etcd-0.c-db2ucluster-sample-etcd:2379,http://c-db2ucluster-sample-etcd-0.c-db2ucluster-sample-etcd:2379,http://c-db2ucluster-sample-etcd-0.c-db2ucluster-sample-etcd:2379
      ETCDCTL_API:                3
      ETCDCTL_ENDPOINTS:          http://c-db2ucluster-sample-etcd-0.c-db2ucluster-sample-etcd:2379,http://c-db2ucluster-sample-etcd-0.c-db2ucluster-sample-etcd:2379,http://c-db2ucluster-sample-etcd-0.c-db2ucluster-sample-etcd:2379
      SERVICE_NAME:               c-db2ucluster-sample-db2u-internal
      DB2U_API_ENDPOINT:          c-db2ucluster-sample-db2u-internal.openshift-operators.svc:50052
      DB2U_API_DATABASE_BACKEND:  k8s
      DB2U_API_CONFIGMAP_NAME:    c-db2ucluster-sample-db2u-api
      DB2U_API_KEY_FILE:          /secrets/certs/db2u-api/tls.key
      DB2U_API_CERT_FILE:         /secrets/certs/db2u-api/tls.crt
    Mounts:
      /db2u/license/ from db2u-lic (ro)
      /dev/shm from dshm (rw)
      /mnt/bludata0 from data (rw)
      /mnt/blumeta0 from data (rw)
      /mnt/blumeta0/configmap/db2/db-cfg from db2dbconfig (ro)
      /mnt/blumeta0/configmap/db2/dbm-cfg from db2dbmconfig (ro)
      /mnt/blumeta0/configmap/db2/registry from db2regconfig (ro)
      /mnt/blumeta0/configmap/db2u from db2uconfig (ro)
      /mnt/local from local (rw)
      /run from runvol (rw)
      /secrets/certs/db2u-api from certs-db2u-api (ro)
      /secrets/certs/wv-rest from certs-wv-rest (ro)
      /secrets/db2instancepwd from instancepassword (ro)
      /secrets/sshkeys/db2instusr from sshkeys-db2instusr (ro)
      /secrets/sshkeys/db2uadm from sshkeys-db2uadm (ro)
      /secrets/sshkeys/db2uhausr from sshkeys-db2uhausr (ro)
      /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-7c8cn (ro)
Conditions:
  Type              Status
  Initialized       True 
  Ready             True 
  ContainersReady   True 
  PodScheduled      True 
Volumes:
  data:
    Type:       PersistentVolumeClaim (a reference to a PersistentVolumeClaim in the same namespace)
    ClaimName:  c-db2ucluster-sample-share
    ReadOnly:   false
  dshm:
    Type:       EmptyDir (a temporary directory that shares a pod's lifetime)
    Medium:     Memory
    SizeLimit:  1Gi
  local:
    Type:       EmptyDir (a temporary directory that shares a pod's lifetime)
    Medium:     
    SizeLimit:  200Mi
  runvol:
    Type:       EmptyDir (a temporary directory that shares a pod's lifetime)
    Medium:     Memory
    SizeLimit:  200Mi
  proc:
    Type:          HostPath (bare host directory volume)
    Path:          /proc
    HostPathType:  
  db2uconfig:
    Type:      ConfigMap (a volume populated by a ConfigMap)
    Name:      c-db2ucluster-sample-db2uconfig
    Optional:  false
  db2regconfig:
    Type:      ConfigMap (a volume populated by a ConfigMap)
    Name:      c-db2ucluster-sample-db2regconfig
    Optional:  false
  db2dbmconfig:
    Type:      ConfigMap (a volume populated by a ConfigMap)
    Name:      c-db2ucluster-sample-db2dbmconfig
    Optional:  false
  db2dbconfig:
    Type:      ConfigMap (a volume populated by a ConfigMap)
    Name:      c-db2ucluster-sample-db2dbconfig
    Optional:  false
  sshkeys-db2uadm:
    Type:        Secret (a volume populated by a Secret)
    SecretName:  c-db2ucluster-sample-sshkeys-db2uadm
    Optional:    false
  sshkeys-db2uhausr:
    Type:        Secret (a volume populated by a Secret)
    SecretName:  c-db2ucluster-sample-sshkeys-db2uhausr
    Optional:    false
  certs-wv-rest:
    Type:        Secret (a volume populated by a Secret)
    SecretName:  c-db2ucluster-sample-certs-wv-rest
    Optional:    false
  instancepassword:
    Type:        Secret (a volume populated by a Secret)
    SecretName:  c-db2ucluster-sample-instancepassword
    Optional:    false
  db2u-lic:
    Type:        Secret (a volume populated by a Secret)
    SecretName:  c-db2ucluster-sample-db2u-lic
    Optional:    false
  sshkeys-db2instusr:
    Type:        Secret (a volume populated by a Secret)
    SecretName:  c-db2ucluster-sample-sshkeys-db2instusr
    Optional:    false
  certs-db2u-api:
    Type:        Secret (a volume populated by a Secret)
    SecretName:  c-db2ucluster-sample-certs-db2u-api
    Optional:    false
  kube-api-access-7c8cn:
    Type:                    Projected (a volume that contains injected data from multiple sources)
    TokenExpirationSeconds:  3607
    ConfigMapName:           kube-root-ca.crt
    ConfigMapOptional:       <nil>
    DownwardAPI:             true
    ConfigMapName:           openshift-service-ca.crt
    ConfigMapOptional:       <nil>
QoS Class:                   Burstable
Node-Selectors:              <none>
Tolerations:                 node.kubernetes.io/memory-pressure:NoSchedule op=Exists
                             node.kubernetes.io/not-ready:NoExecute op=Exists for 300s
                             node.kubernetes.io/unreachable:NoExecute op=Exists for 300s
Events:
  Type    Reason          Age   From               Message
  ----    ------          ----  ----               -------
  Normal  Scheduled       21m   default-scheduler  Successfully assigned openshift-operators/c-db2ucluster-sample-db2u-0 to worker2.jscp4d.cp.fyre.ibm.com
  Normal  AddedInterface  21m   multus             Add eth0 [10.254.20.11/22] from openshift-sdn
  Normal  Pulling         21m   kubelet            Pulling image "icr.io/db2u/db2u.tools@sha256:29dbf32fc8ac1e7cb019d0caa3cce5616ecc23a87e329b7c73be9f9abde743be"
  Normal  Pulled          19m   kubelet            Successfully pulled image "icr.io/db2u/db2u.tools@sha256:29dbf32fc8ac1e7cb019d0caa3cce5616ecc23a87e329b7c73be9f9abde743be" in 1m7.746558946s
  Normal  Created         19m   kubelet            Created container init-labels
  Normal  Started         19m   kubelet            Started container init-labels
  Normal  Pulled          19m   kubelet            Container image "icr.io/db2u/db2u.tools@sha256:29dbf32fc8ac1e7cb019d0caa3cce5616ecc23a87e329b7c73be9f9abde743be" already present on machine
  Normal  Created         19m   kubelet            Created container init-kernel
  Normal  Started         19m   kubelet            Started container init-kernel
  Normal  Pulling         19m   kubelet            Pulling image "icr.io/db2u/db2u@sha256:19c7cde0ff5a94091566f0b7cec85f692e8060efdf82975598d1c9ffe35ef7ec"
  Normal  Pulled          14m   kubelet            Successfully pulled image "icr.io/db2u/db2u@sha256:19c7cde0ff5a94091566f0b7cec85f692e8060efdf82975598d1c9ffe35ef7ec" in 5m41.798357665s
  Normal  Created         14m   kubelet            Created container db2u
  Normal  Started         14m   kubelet            Started container db2u
```

Access to the database.    
```
[root@api.jscp4d.cp.fyre.ibm.com util]# oc rsh c-db2ucluster-sample-db2u-0
Defaulted container "db2u" out of: db2u, init-labels (init), init-kernel (init)
sh-4.4$ su - db2inst1
Last login: Fri Sep 16 06:32:47 UTC 2022
[db2inst1@c-db2ucluster-sample-db2u-0 - Db2U db2inst1]$ db2 list db directory

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

[db2inst1@c-db2ucluster-sample-db2u-0 - Db2U db2inst1]$ db2 connect to bludb

   Database Connection Information

 Database server        = DB2/LINUXX8664 11.5.7.0
 SQL authorization ID   = DB2INST1
 Local database alias   = BLUDB
```


## MISC.   

### Storage class not configured       

If you are deploying Db2 with a storage class, related new resource creation may be in `pending` status waiting for a storage class.      

```
[root@api.jscp4d.cp.fyre.ibm.com ~]# oc get all -A |grep -i db2
openshift-operators                                pod/c-db2ucluster-sample-instdb-sdsj4                                 0/1     Pending     0               18m       <====
openshift-operators                                pod/c-db2ucluster-sample-ldap-6b84c4c556-kbdvc                        0/1     Pending     0               18m
openshift-operators                                pod/db2u-operator-manager-7c86548cd8-c8gkw                            1/1     Running     0               83m
openshift-operators                                service/c-db2ucluster-sample-ldap                  ClusterIP      172.30.121.103   <none>                                 50389/TCP                             18m
openshift-operators                                deployment.apps/c-db2ucluster-sample-ldap                   0/1     1            0           18m
openshift-operators                                deployment.apps/db2u-operator-manager                       1/1     1            1           83m
openshift-operators                                replicaset.apps/c-db2ucluster-sample-ldap-6b84c4c556                   1         1         0       18m
openshift-operators                                replicaset.apps/db2u-operator-manager-7c86548cd8                       1         1         1       83m
openshift-operators                    job.batch/c-db2ucluster-sample-instdb                                       0/1           18m        18m
```

Then, check the history of the resource.     


```yaml
[root@api.jscp4d.cp.fyre.ibm.com ~]# oc describe pod/c-db2ucluster-sample-instdb-sdsj4 
Name:           c-db2ucluster-sample-instdb-sdsj4
Namespace:      openshift-operators
Priority:       0
Node:           <none>
Labels:         app=db2ucluster-sample
                controller-uid=ba1748f2-c4d4-4009-b994-32c60d07d6f9
                formation_id=db2ucluster-sample
                job-name=c-db2ucluster-sample-instdb
Annotations:    openshift.io/scc: openshift-operators-c-db2ucluster-sample-scc
Status:         Pending
IP:             
IPs:            <none>
Controlled By:  Job/c-db2ucluster-sample-instdb
Containers:
  instdb:
    Image:      icr.io/db2u/db2u.instdb@sha256:190d61e85238665984301dea9ee81421f2cffd042f506fc44e07d52139e7c0de
    Port:       <none>
    Host Port:  <none>
    Command:
      /bin/sh
      -c
      /Db2wh_preinit/instdb_entrypoint.sh
    Limits:
      cpu:                1
      ephemeral-storage:  5Mi
      memory:             1Gi
    Requests:
      cpu:                500m
      ephemeral-storage:  1Mi
      memory:             1Gi
    Environment:
      SERVICENAME:   c-db2ucluster-sample-instdb
      role:          instdb
      SERVICE_NAME:  c-db2ucluster-sample
    Mounts:
      /mnt/blumeta0 from meta (rw)
      /mnt/blumeta0/configmap/db2/registry from db2regconfig (ro)
      /mnt/blumeta0/configmap/db2u from db2uconfig (ro)
      /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-szcqr (ro)
Conditions:
  Type           Status
  PodScheduled   False 
Volumes:
  meta:
    Type:       PersistentVolumeClaim (a reference to a PersistentVolumeClaim in the same namespace)
    ClaimName:  c-db2ucluster-sample-share
    ReadOnly:   false
  db2uconfig:
    Type:      ConfigMap (a volume populated by a ConfigMap)
    Name:      c-db2ucluster-sample-db2uconfig
    Optional:  false
  db2regconfig:
    Type:      ConfigMap (a volume populated by a ConfigMap)
    Name:      c-db2ucluster-sample-db2regconfig
    Optional:  false
  kube-api-access-szcqr:
    Type:                    Projected (a volume that contains injected data from multiple sources)
    TokenExpirationSeconds:  3607
    ConfigMapName:           kube-root-ca.crt
    ConfigMapOptional:       <nil>
    DownwardAPI:             true
    ConfigMapName:           openshift-service-ca.crt
    ConfigMapOptional:       <nil>
QoS Class:                   Burstable
Node-Selectors:              <none>
Tolerations:                 node.kubernetes.io/memory-pressure:NoSchedule op=Exists
                             node.kubernetes.io/not-ready:NoExecute op=Exists for 300s
                             node.kubernetes.io/unreachable:NoExecute op=Exists for 300s
Events:
  Type     Reason            Age                From               Message
  ----     ------            ----               ----               -------
  Warning  FailedScheduling  19m                default-scheduler  0/6 nodes are available: 6 pod has unbound immediate PersistentVolumeClaims.
  Warning  FailedScheduling  16m (x2 over 18m)  default-scheduler  0/6 nodes are available: 6 pod has unbound immediate PersistentVolumeClaims.
```

Here, above shows it failed to find PVC(PersistentVolumnClaims).         


Db2 deployment tries to create a pvc but there is no storage class to be bound.    
```
[root@api.jscp4d.cp.fyre.ibm.com ~]# oc get sc -A
No resources found

[root@api.jscp4d.cp.fyre.ibm.com ~]# oc get pvc -A
NAMESPACE                  NAME                         STATUS    VOLUME             CAPACITY   ACCESS MODES   STORAGECLASS          AGE
openshift-image-registry   image-registry-storage       Bound     registry-storage   200Gi      RWX                                  5h48m
openshift-operators        c-db2ucluster-sample-share   Pending                                                managed-nfs-storage   21m
```

Once you create a storage class, it will be bound automatically as it's polling.      

```
[root@api.jscp4d.cp.fyre.ibm.com util]# oc get pvc -A
NAMESPACE                  NAME                         STATUS   VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS          AGE
openshift-image-registry   image-registry-storage       Bound    registry-storage                           200Gi      RWX                                  5h55m
openshift-operators        c-db2ucluster-sample-share   Bound    pvc-7ae3db0d-d89e-42b1-ac16-446a15a8f956   100Gi      RWX            managed-nfs-storage   28m   <==========
openshift-operators        test-claim                   Bound    pvc-b763cb5b-7c0c-4bdd-822f-d4d6a601dd93   1Mi        RWX            managed-nfs-storage   48s
```

Then, the pod status makes processes.   
```
[root@api.jscp4d.cp.fyre.ibm.com util]# oc get pod -A |grep -i db2
openshift-operators                                c-db2ucluster-sample-instdb-sdsj4                                 0/1     ContainerCreating   0               30m
openshift-operators                                c-db2ucluster-sample-ldap-6b84c4c556-kbdvc                        1/1     Running             0               30m
openshift-operators                                db2u-operator-manager-7c86548cd8-c8gkw                            1/1     Running             0               94m

```

```yaml
[root@api.jscp4d.cp.fyre.ibm.com util]# oc describe pod c-db2ucluster-sample-instdb-sdsj4 
Name:         c-db2ucluster-sample-instdb-sdsj4
Namespace:    openshift-operators
Priority:     0
Node:         worker2.jscp4d.cp.fyre.ibm.com/10.17.29.5
Start Time:   Thu, 15 Sep 2022 23:06:25 -0700
Labels:       app=db2ucluster-sample
              controller-uid=ba1748f2-c4d4-4009-b994-32c60d07d6f9
              formation_id=db2ucluster-sample
              job-name=c-db2ucluster-sample-instdb
...
Events:
  Type     Reason            Age                From               Message
  ----     ------            ----               ----               -------
  Warning  FailedScheduling  30m                default-scheduler  0/6 nodes are available: 6 pod has unbound immediate PersistentVolumeClaims.
  Warning  FailedScheduling  27m (x2 over 29m)  default-scheduler  0/6 nodes are available: 6 pod has unbound immediate PersistentVolumeClaims.
  Normal   Scheduled         3m51s              default-scheduler  Successfully assigned openshift-operators/c-db2ucluster-sample-instdb-sdsj4 to worker2.jscp4d.cp.fyre.ibm.com
  Normal   AddedInterface    3m49s              multus             Add eth0 [10.254.20.9/22] from openshift-sdn
  Normal   Pulling           3m49s              kubelet            Pulling image "icr.io/db2u/db2u.instdb@sha256:190d61e85238665984301dea9ee81421f2cffd042f506fc44e07d52139e7c0de"
  Normal   Pulled            25s                kubelet            Successfully pulled image "icr.io/db2u/db2u.instdb@sha256:190d61e85238665984301dea9ee81421f2cffd042f506fc44e07d52139e7c0de" in 3m23.54317268s
  Normal   Created           25s                kubelet            Created container instdb
  Normal   Started           25s                kubelet            Started container instdb
```

