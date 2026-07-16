import React, { useState } from "react";
import { FileText, ExternalLink, Download } from "lucide-react";

interface Attachment {
  name: string;
  url: string;
  size: string;
}

interface WebLink {
  title: string;
  url: string;
}

interface MaterialTabsProps {
  attachments: Attachment[];
  externalLinks: WebLink[];
  description: string;
}

export function MaterialTabs({ attachments, externalLinks, description }: MaterialTabsProps) {
  const [activeTab, setActiveTab] = useState<"about" | "attachments" | "links">("about");

  return (
    <div className="w-full bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="flex border-b border-gray-200 bg-gray-50">
        {(["about", "attachments", "links"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3.5 text-sm font-semibold border-b-2 transition-all ${
              activeTab === tab
                ? "border-blue-600 text-blue-600 bg-white"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100/50"
            }`}
          >
            {tab === "about" && "Tentang Kelas"}
            {tab === "attachments" && `Lampiran (${attachments.length})`}
            {tab === "links" && `Link Eksternal (${externalLinks.length})`}
          </button>
        ))}
      </div>

      <div className="p-6">
        {activeTab === "about" && (
          <div className="prose max-w-none text-sm text-gray-600 leading-relaxed">
            <p>{description}</p>
          </div>
        )}

        {activeTab === "attachments" && (
          <div className="space-y-2">
            {attachments.length === 0 ? (
              <p className="text-sm text-gray-400">Tidak ada lampiran untuk kelas ini.</p>
            ) : (
              attachments.map((att, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3.5 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-red-500" />
                    <div>
                      <p className="text-sm font-bold text-gray-900">{att.name}</p>
                      <p className="text-xs text-gray-400">{att.size}</p>
                    </div>
                  </div>
                  <a
                    href={att.url}
                    download
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Unduh
                  </a>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "links" && (
          <div className="space-y-2">
            {externalLinks.length === 0 ? (
              <p className="text-sm text-gray-400">Tidak ada link eksternal untuk kelas ini.</p>
            ) : (
              externalLinks.map((link, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3.5 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <ExternalLink className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm font-bold text-gray-900">{link.title}</p>
                      <p className="text-xs text-gray-400 line-clamp-1">{link.url}</p>
                    </div>
                  </div>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-blue-200 rounded-lg text-xs font-semibold text-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    Kunjungi
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
