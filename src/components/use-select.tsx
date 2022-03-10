import React from "react";
import { useUserList } from "hooks/useUserList";
import { IdSelect } from "./id-select";

export const UserSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const { data: users } = useUserList();
  return <IdSelect options={users || []} {...props} />;
};
