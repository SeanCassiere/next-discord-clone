import React, { useMemo } from "react";
import cn from "classnames";
import { useRouter } from "next/router";
import { FaIceCream, FaCompass, FaPlus } from "react-icons/fa";
import { trpc } from "../../../../utils/trpc";
import { getNameAbbreviation } from "../../../../utils/get-name-abbreviation";

const ServerListSideBar: React.FC<{ activeConversationId: string }> = ({ activeConversationId }) => {
  const router = useRouter();

  const { data: serversForUser } = trpc.useQuery(["user.get-server-list-for-user"]);

  const serverList = useMemo(() => {
    let list: {
      id: string;
      name: string;
      image: string | null;
      type: string;
      onClick: any;
      iconComponent: React.ReactNode;
      forceAriaSelect?: boolean;
    }[] = [
      {
        id: "@me",
        name: "app-navigation",
        image: null,
        type: "app-navigation",
        onClick: () => router.push("/channels/@me"),
        iconComponent: <FaIceCream size="28" />,
        forceAriaSelect: true,
      },
      {
        id: "divider-1",
        name: "divider",
        image: null,
        type: "divider",
        iconComponent: <SideBarDivider />,
        onClick: async () => false,
      },
    ];
    const mappedServers = (serversForUser ? serversForUser : []).map((server) => ({
      id: server.id,
      name: server.name,
      image: server.image,
      type: "app-navigation",
      onClick: () =>
        router.push(
          server.lastVisitedChannel
            ? `/channels/` + server.id + "/" + server.lastVisitedChannel
            : "/channels/" + server.id
        ),
      iconComponent: (
        <ServerIcon image={server.image} name={server.name} isActive={activeConversationId === server.id} />
      ),
    }));
    list = [...list, ...mappedServers];
    list.push({
      id: "divider-2",
      name: "divider",
      image: null,
      type: "divider",
      iconComponent: <SideBarDivider />,
      onClick: async () => false,
    });
    list.push({
      id: "add-server",
      name: "Add server",
      image: null,
      type: "app-interaction",
      onClick: () => alert("Add a server"),
      iconComponent: <FaPlus size="22" />,
    });
    list.push({
      id: "find-servers",
      name: "Discover",
      image: null,
      type: "app-interaction",
      onClick: () => alert("Find server"),
      iconComponent: <FaCompass size="22" />,
    });
    return list;
  }, [activeConversationId, router, serversForUser]);

  return (
    <nav className="small-scroller flex-0 overflow-y-auto overflow-x-hidden h-screen bg-discordgray-900 shadow-lg pt-1">
      <div aria-label="servers" className="w-[calc(4.5rem)] flex flex-col">
        {serverList.map((option) => (
          <React.Fragment key={`server-list-${option.id}`}>
            {(option.type === "app-navigation" || option.type === "app-interaction") && (
              <SideBarIcon
                isActive={activeConversationId === option.id}
                onClick={option.onClick}
                icon={option.iconComponent}
                forceAriaSelection={option.forceAriaSelect}
              />
            )}
            {option.type === "divider" && <>{option.iconComponent}</>}
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
};

const SideBarIcon: React.FC<
  { icon: React.ReactNode; isActive?: boolean; forceAriaSelection?: boolean } & React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
> = ({ icon, isActive = false, forceAriaSelection, ...rest }) => {
  const className = cn(
    "relative",
    "flex",
    "items-center",
    "justify-center",
    "h-12",
    "w-12",
    "mt-2",
    "mb-2",
    "mx-auto",
    {
      "rounded-3xl": isActive === false,
      "bg-discordgray-800": isActive === false,
      "hover:bg-indigo-500": isActive === false,
      "text-discordgray-50": isActive === false,
      "hover:text-white": isActive === false,
      "hover:rounded-xl": isActive === false,
    },
    {
      "bg-indigo-500": isActive,
      "text-white": isActive,
      "rounded-xl": isActive,
    },
    "transition-all",
    "duration-300",
    "ease-linear",
    "cursor-pointer",
    "shadow-lg",
    "group",
    "select-none"
  );

  const indicatorClassName = cn(
    "absolute",
    "w-2",
    "-left-4",
    "rounded-r-sm",
    "origin-left",
    "transition-all",
    "duration-200",
    "bg-white",
    {
      "h-4": isActive === false,
      "top-4": isActive === false,
      "scale-0": isActive === false,
      "group-hover:scale-100": isActive === false,
    },
    { "h-8": isActive, "top-2": isActive, "scale-100": isActive }
  );

  const aria = {
    ...(!forceAriaSelection && !isActive ? { "aria-hidden": true } : {}),
    ...(isActive ? { "aria-selected": true } : {}),
  };
  return (
    <div {...rest} className={className} {...aria}>
      <span aria-hidden="true" className={indicatorClassName}></span>
      {icon}
    </div>
  );
};

const ServerIcon: React.FC<{ image: string | null; name: string; isActive?: boolean }> = ({
  image,
  name,
  isActive = false,
}) => {
  const className = cn(
    "transition-all",
    "duration-300",
    "ease-linear",
    "overflow-hidden",
    "w-12",
    "flex",
    "items-center",
    "justify-center",
    {
      "rounded-3xl": isActive === false,
      "hover:rounded-xl": isActive === false,
    },
    {
      "rounded-xl": isActive,
    }
  );
  return (
    <div className={className} aria-hidden="true">
      {image ? (
        <img className="object-cover" width={50} height={50} src={image} alt={name} />
      ) : (
        <span>{getNameAbbreviation(name)}</span>
      )}
    </div>
  );
};

const SideBarDivider = () => {
  return <hr className="bg-discordgray-800 border border-discordgray-800 rounded-full mx-6" aria-hidden="true" />;
};

export default ServerListSideBar;
