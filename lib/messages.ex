defmodule Channels.Messages do
  alias Channels.Message
  alias Channels.Repo

  def create(params) do
    Repo.insert(%Message{
      body: params.body,
      sender: params.sender
    })
  end

  def all() do
    Repo.all(Message)
  end
end
