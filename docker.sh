#!/bin/bash

echo -n "enter type compose command ? "
read type

[[ "$type" ]] && docker-compose $type;