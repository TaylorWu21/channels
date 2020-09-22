defmodule ChannelsWeb.PartTwoChannel do
  use Phoenix.Channel

  alias Channels.Messages

  intercept(["new_message"])

  def join("part_two:lobby", _message, socket) do
    {:ok, "Successfully joined channel part_two:lobby", socket}
  end

  def join("part_two:" <> private_room_id, _params, socket) do
    {:ok, "Successfully joined channel part_two:#{private_room_id}", socket}
  end

  @spec handle_in(<<_::88>>, map, Phoenix.Socket.t()) :: {:noreply, Phoenix.Socket.t()}
  def handle_in("new_message", params, socket) do
    message = %{
      body: params["message"],
      sender: socket.assigns.username
    }

    case Messages.create(message) do
      {:ok, inserted_message} ->
        broadcast!(socket, "new_message", inserted_message)
        {:noreply, socket}

      {:error, error} ->
        {:error, error}
    end
  end

  def handle_out("new_message", message, socket) do
    message =
      message
      |> Map.from_struct()
      |> Map.delete(:__meta__)

    push(
      socket,
      "new_message",
      message
    )

    {:noreply, socket}
  end
end
