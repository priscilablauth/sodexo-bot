class Address

  def == (other)
    @state == other.state and @city == other.city and @neighborhood == other.neighborhood and @street == other.street
  end

  def to_s
    "#{@street} - #{@city} - #{@state}"
  end

  def human_readable
    to_s
  end
end
