A few very minor changes are needed:

https://kubernetes.io/docs/concepts/services-networking/ingress/

1. A pathType needs to be added

2. How we specify the backend service name and port has changed

3. The kubernetes.io/ingress.class annotation should be removed and replaced by the ingressClassName field under the spec:



apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ingress-srv
spec:
  ingressClassName: nginx
  rules:
    - host: posts.com
      http:
        paths:
          - path: /posts
            pathType: Prefix
            backend:
              service:
                name: posts-clusterip-srv
                port:
                  number: 4000
Cannot be used with pathType Prefix Warning
A few lectures from now, you may eventually see a warning in your terminal:

Warning: path /posts/?{.*}/comments cannot be used with pathType Prefix
Warning: path /?{.*} cannot be used with pathType Prefix

If you wish to suppress the warning and follow the latest guidance, then, you can use the ImplementationSpecific pathType as explained in the updated docs:

https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/configmap/#strict-validate-path-type

So, for any path that makes use of a regex, you would use ImplementationSpecific instead of Prefix.

eg:

          - path: /posts/?(.*)/comments
            pathType: ImplementationSpecific