#!/bin/bash


PID=$(lsof -P -iTCP | grep LISTEN | grep node | awk '{print $2}')
hasLooseHandle() {
  if test -z "$PID"
  then
    false
  else
    return
  fi

}
if hasLooseHandle; then
  kill -9 "$PID"
fi
