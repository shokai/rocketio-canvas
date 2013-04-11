RocketIO Canvas
===============
share canvas on [Sinatra RocketIO](https://github.com/shokai/sinatra-rocketio)

* https://github.com/shokai/rocketio-canvas


Demo
----
http://dev.shokai.org:4200


Install Dependencies
--------------------

    % gem install bundler
    % bundle install


Run
---

    % rackup config.ru -p 5000

=> http://localhost:5000


set websocket port

    % WS_PORT=18080 rackup config.ru -p 5000
