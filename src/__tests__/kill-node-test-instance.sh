kill -9 `lsof -P -iTCP | grep LISTEN | grep node | awk '{print $2}'`
