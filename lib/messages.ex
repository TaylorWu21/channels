defmodule Channels.Messages do
  alias Channels.Message
  alias Channels.Repo

  import Ecto.Query

  def create(params) do
    Repo.insert(%Message{
      body: params.body,
      sender: params.sender
    })
  end

  def latest_messages(last_message_id) do
    message = Repo.get!(Message, last_message_id)

    query =
      from m in Message,
        where: m.inserted_at > ^message.inserted_at

    Repo.all(query)
  end

  def all() do
    query =
      from m in Message,
        order_by: m.inserted_at

    Repo.all(query)
  end
end
