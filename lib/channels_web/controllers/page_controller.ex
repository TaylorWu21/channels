defmodule ChannelsWeb.PageController do
  use ChannelsWeb, :controller

  alias Channels.Messages

  def index(conn, _params) do
    render(conn, "index.html")
  end

  def last_messages(conn, %{"id" => id}) do
    messages =
      id
      |> Messages.latest_messages()
      |> Enum.map(&(Map.from_struct(&1) |> Map.delete(:__meta__)))

    json(conn, messages)
  end

  def messages(conn, _params) do
    messages =
      Messages.all()
      |> Enum.map(&(Map.from_struct(&1) |> Map.delete(:__meta__)))

    json(conn, messages)
  end
end
