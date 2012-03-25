module Spider
  class Sodexo
    include Capybara::DSL

    def initialize
      visit('/sodexhopass/DadosBusca.aspx')
    end

    def states
      states = all("select#cboUF option").map do |state|
        state.value
      end
      states.drop(1)
    end

    def cities(state)
      select(state, :from => 'cboUF')
      wait_until do
        fetch_cities.size > 1
      end
      cities = fetch_cities.map do |city|
        city.value
      end
      cities.drop(1)
    end

    def search(city)
      select(city, :from => 'cboCidade')
      wait_until { all('select#cboBairro option').size > 1 }
      find_button('btnBuscarEstCid').click
      extract_results
    end

    private
    def fetch_cities
      all('select#cboCidade option')
    end

    def extract_results
      results = all('table#dlDadosBusca tbody tr td table').map do |table|
        lines = table.all('tr').map do |line|
          line.text
        end
        lines.slice!(-1)
        lines
      end
    end

  end
end
