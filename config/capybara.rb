require 'capybara/dsl'

Capybara.run_server = false
Capybara.default_wait_time = 10
Capybara.current_driver = :selenium
Capybara.app_host = "http://webservices.maplink2.com.br"
