defmodule Channels.Message do
  use Ecto.Schema

  schema "messages" do
    field :body, :string
    field :sender, :string

    timestamps()
  end
end
