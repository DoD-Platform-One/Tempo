# Keycloak Configuration for Tempo

1. Create a Tempo client
   - Change the following configuration items
      - access type: confidential _this will enable a "Credentials" tab within the client configuration page_
      - Direct Access Grants Enabled: Off
      - Valid Redirect URIs: https://tracing.${DOMAIN}/login
        - If you want to deploy both Jaeger and Tempo at the same time you should set this to https://tempo.${DOMAIN}/login
      - Base URL: https://tracing.${DOMAIN}
        - If you want to deploy both Jaeger and Tempo at the same time you should set this to https://tempo.${DOMAIN}
    - Take note of the client secret in the credentials tab

2. Deploy from Big Bang with the SSO values set:
  ```yaml
  tempo:
    sso:
      enabled: true
      client_id: <id for client you created>
      client_secret: <client secret from the credentials tab>
  ```

3. Tempo will be deployed with Authservice protecting the UI behind your SSO provider.
