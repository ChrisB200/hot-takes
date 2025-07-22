create type "public"."role" as enum ('spectator', 'debater');

create table "public"."room_users" (
    "room_id" uuid not null,
    "user_id" uuid not null,
    "role" role not null
);


create table "public"."rooms" (
    "id" uuid not null default gen_random_uuid(),
    "topic" text not null,
    "active" boolean not null,
    "user_id" uuid not null
);


CREATE UNIQUE INDEX room_users_pkey ON public.room_users USING btree (room_id, user_id);

CREATE UNIQUE INDEX rooms_pkey ON public.rooms USING btree (id);

alter table "public"."room_users" add constraint "room_users_pkey" PRIMARY KEY using index "room_users_pkey";

alter table "public"."rooms" add constraint "rooms_pkey" PRIMARY KEY using index "rooms_pkey";

alter table "public"."room_users" add constraint "room_users_room_id_fkey" FOREIGN KEY (room_id) REFERENCES rooms(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."room_users" validate constraint "room_users_room_id_fkey";

alter table "public"."room_users" add constraint "room_users_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."room_users" validate constraint "room_users_user_id_fkey";

alter table "public"."rooms" add constraint "rooms_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."rooms" validate constraint "rooms_user_id_fkey";

grant delete on table "public"."room_users" to "anon";

grant insert on table "public"."room_users" to "anon";

grant references on table "public"."room_users" to "anon";

grant select on table "public"."room_users" to "anon";

grant trigger on table "public"."room_users" to "anon";

grant truncate on table "public"."room_users" to "anon";

grant update on table "public"."room_users" to "anon";

grant delete on table "public"."room_users" to "authenticated";

grant insert on table "public"."room_users" to "authenticated";

grant references on table "public"."room_users" to "authenticated";

grant select on table "public"."room_users" to "authenticated";

grant trigger on table "public"."room_users" to "authenticated";

grant truncate on table "public"."room_users" to "authenticated";

grant update on table "public"."room_users" to "authenticated";

grant delete on table "public"."room_users" to "service_role";

grant insert on table "public"."room_users" to "service_role";

grant references on table "public"."room_users" to "service_role";

grant select on table "public"."room_users" to "service_role";

grant trigger on table "public"."room_users" to "service_role";

grant truncate on table "public"."room_users" to "service_role";

grant update on table "public"."room_users" to "service_role";

grant delete on table "public"."rooms" to "anon";

grant insert on table "public"."rooms" to "anon";

grant references on table "public"."rooms" to "anon";

grant select on table "public"."rooms" to "anon";

grant trigger on table "public"."rooms" to "anon";

grant truncate on table "public"."rooms" to "anon";

grant update on table "public"."rooms" to "anon";

grant delete on table "public"."rooms" to "authenticated";

grant insert on table "public"."rooms" to "authenticated";

grant references on table "public"."rooms" to "authenticated";

grant select on table "public"."rooms" to "authenticated";

grant trigger on table "public"."rooms" to "authenticated";

grant truncate on table "public"."rooms" to "authenticated";

grant update on table "public"."rooms" to "authenticated";

grant delete on table "public"."rooms" to "service_role";

grant insert on table "public"."rooms" to "service_role";

grant references on table "public"."rooms" to "service_role";

grant select on table "public"."rooms" to "service_role";

grant trigger on table "public"."rooms" to "service_role";

grant truncate on table "public"."rooms" to "service_role";

grant update on table "public"."rooms" to "service_role";


