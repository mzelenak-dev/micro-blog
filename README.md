Simple React frontend for creating text posts and comments to play with microservice architecture, Docker, Kubernetes and more.

Assumes you have localhost dev server mapped to posts.com in your `/etc/hosts` file.
```
127.0.0.1 posts.com
```

visit posts.com in your browser to use public routes

- run skaffold to build all the images, host them on docker hub, start deployments and services and generate container pods
- get the list of existing pods in local dev cluster
- run logs of whatever service in cluster to see any server logs (likely just event-bus)
```
$ skaffold dev
$ kubectl get pods
$ kubectl logs ${name of event bus, moderation, etc... pod}
```
