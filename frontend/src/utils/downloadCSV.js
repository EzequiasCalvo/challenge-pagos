export const downloadCSV = (payments) => {
  const headers = ["Recipient", "Type", "Description", "Amount", "Date"];
  const csvRows = [
    headers.join(","), // First row for headers
    ...payments.map((payment) => {
      // Map each payment into CSV format
      const date = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(payment.creation_date));
      return [
        payment.recipient,
        payment.payment_type,
        payment.description,
        payment.amount,
        date,
      ].join(",");
    }),
  ];

  const csvString = csvRows.join("\n");
  const blob = new Blob([csvString], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.setAttribute("hidden", "");
  a.setAttribute("href", url);
  a.setAttribute("download", "payments_list.csv");
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
