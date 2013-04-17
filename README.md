RocketIO Canvas
===============
share canvas on [Sinatra RocketIO](https://github.com/shokai/sinatra-rocketio)

* https://github.com/shokai/rocketio-canvas


Demo
----
http://canvas.shokai.org


Install Dependencies
--------------------

    % gem install bundler
    % bundle install


Run
---

    % rackup config.ru -p 5000

=> http://localhost:5000


set websocket port

    % WS_PORT=5001 rackup config.ru -p 5000
    % WS_PORT=5001 rackup config.ru -p 5000 --env production
