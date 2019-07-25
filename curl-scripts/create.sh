#!/bin/bash
curl "https://radiant-scrubland-74854.herokuapp.com/" \
  --include \
  --request POST \
  --header "Content-Type: application/json"\
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "game": {
      "title": "'"${TITLE}"'",
      "company": "'"${COMPANY}"'",
      "year_released": "'"${YEAR_RELEASED}"'"

    }
  }'

echo
