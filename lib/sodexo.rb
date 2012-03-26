# encoding: utf-8
module Spider
  class Sodexo
    include Capybara::DSL

    def initialize
      go_to_search_page
    end

    def go_to_search_page
      visit('/sodexhopass/DadosBusca.aspx')
      select('Refeição Pass', :from => 'cboServico')
      wait_until do
        find('select#cboBairro').has_content? 'Selecione uma Cidade'
      end
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

    def search(state, city)
      select(state, :from => 'cboUF')
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
      results = []
      loop do
        result_for_current_page.each do |result|
          results << result
        end
        break unless page.has_css? 'input#cmdNext'
        find('input#cmdNext').click
      end
      results
    end

    def result_for_current_page
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
