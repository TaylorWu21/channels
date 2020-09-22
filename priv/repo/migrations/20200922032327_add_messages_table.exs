defmodule Channels.Repo.Migrations.AddMessagesTable do
  use Ecto.Migration

  def change do
    create table(:messages) do
      add :body, :string
      add :sender, :string

      timestamps()
    end
  end
end
