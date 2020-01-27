#!/bin/bash
set -e

echo "Updating settings.js on $(date)";

if [ -z ${REACT_APP_MCP_DATA_MAPPING_UTIL+x} ]
  then echo "Environment variable REACT_APP_MCP_DATA_MAPPING_UTIL is required, but it is not set. Exiting."; exit 1;
fi

# Not currently used.
# if [ -z ${REACT_APP_GRAPHQL_API_URL+x} ]
#   then echo "Environment variable REACT_APP_GRAPHQL_API_URL is required, but it is not set. Exiting."; exit 1;
# fi

SET_CONFIG="NODE_ENV=\"$NODE_ENV\";\n
REACT_APP_MCP_DATA_MAPPING_UTIL=\"$REACT_APP_MCP_DATA_MAPPING_UTIL\";\n"

echo -e $SET_CONFIG >> /usr/share/nginx/html/settings.js

nginx -g 'daemon off;'
