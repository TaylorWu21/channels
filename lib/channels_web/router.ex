defmodule ChannelsWeb.Router do
  use ChannelsWeb, :router

  pipeline :browser do
    plug(:accepts, ["html"])
    plug(:fetch_session)
    plug(:fetch_flash)
    plug(:protect_from_forgery)
    plug(:put_secure_browser_headers)
  end

  pipeline :api do
    plug(:accepts, ["json"])
  end

  scope "/", ChannelsWeb do
    pipe_through(:browser)

    get("/messages", PageController, :messages)
    get("/last_messages/:id", PageController, :last_messages)

    # React endpoint is a catchall - needs to be at the bottom
    get("/*path", PageController, :index)
  end
end
