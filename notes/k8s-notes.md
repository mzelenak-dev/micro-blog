kubernetes notes

when specifying the containers image (in spec: containers: - image) if you apply a semver tag (asdf:0.0.1) to the image you created in docker then k8s will look for a local image instead of a hosted one.

in order to pull the :latest tag in k8s deployment configs, dont add the semver tag (or any colon specifying tag) and ensure that the image exists on docker hub when restarting the deployment (kubectl rollout restart deployment {DEPLOYMENT_NAME})