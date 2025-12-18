export default function OrdoPage() {
  const items = [
    {
      name: "Faith",
      description:
        "Put God first through prayer, sacraments, and trust. Your relationship with God anchors everything else.",
    },
    {
      name: "Health",
      description:
        "Care for your body and mind. Rest, nutrition and exercise enable you to serve others.",
    },
    {
      name: "Family",
      description:
        "Honor the relationships entrusted to you: spouse, children, parents and extended family.",
    },
    {
      name: "Work",
      description:
        "Offer your daily labor to God. Use your gifts diligently without letting work define you.",
    },
    {
      name: "Provision",
      description:
        "Steward your resources wisely. Provide for yourself and those dependent on you.",
    },
    {
      name: "Community",
      description:
        "Engage with friends, parish and neighborhood. Offer your presence and support.",
    },
    {
      name: "Rest",
      description:
        "Sabbath and leisure restore your soul. Make space for silence and recreation.",
    },
  ];
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold text-gray-800">Ordo Amoris</h1>
      <p className="text-gray-600">The Order of Loves teaches us to love the right things in the right order.</p>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.name} className="border p-4 rounded-md bg-white">
            <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
            <p className="text-gray-600">{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
