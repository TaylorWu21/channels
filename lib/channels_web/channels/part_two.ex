defmodule ChannelsWeb.PartTwoChannel do
  use Phoenix.Channel

  def join("part_two:lobby", _message, socket) do
    # TODO FIX JOIN ISSUE
    {:ok, "Successfully joined channel part_two:lobby", socket}
  end

  def join("part_two:" <> private_room_id, _params, socket) do
    {:ok, "Successfully joined channel part_two:#{private_room_id}", socket}
  end

  def handle_in("new_message", params, socket) do
    IO.inspect(params, label: "PARAMS")
    broadcast!(socket, "new_message", params)
    {:noreply, socket}
  end
end
