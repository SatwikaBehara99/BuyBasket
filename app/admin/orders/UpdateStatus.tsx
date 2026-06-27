"use client";

export default function UpdateStatus({
  id,
  currentStatus,
}: {
  id: string;
  currentStatus: string;
}) {

  const handleChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {

    await fetch(
      `/api/admin/orders/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          status: e.target.value,
        }),
      }
    );

    window.location.reload();
  };

  return (
    <select
      defaultValue={currentStatus} onChange={handleChange} className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-900 text-black dark:text-white"
    >
      <option value="PENDING"> PENDING </option>
      <option value="PROCESSING"> PROCESSING </option>
      <option value="SHIPPED"> SHIPPED </option>
      <option value="DELIVERED"> DELIVERED </option>
      <option value="CANCELLED"> CANCELLED </option>
      <option value="RETURNED"> RETURNED </option>
      <option value="FAILED"> FAILED </option>
    </select>
  );
}