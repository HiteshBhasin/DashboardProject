"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Header from "../../ChildComponentsJS/Header";
import NavSideBar from "../../ChildComponentsJS/NavSideBar";
import PageTitle from "../../components/PageTitle";
import Tabs from "../../components/Tabs";
import ArrowAndDescription from "../../ChildComponentsJS/ArrowAndDescription";
import Button from "../../ChildComponentsJS/Buttons";
import RegularCard from "../../ChildComponentsJS/DetailCard";
import SpecialCard from "../../ChildComponentsJS/SpecialCard";
import SearchBar from "../../ChildComponentsJS/SearchBar";

interface EmergencyContact {
  name: string;
  email: string;
  phone: string;
  relationship: string;
}

interface Lease {
  leaseStart: string;
  leaseEnd: string;
  property: string;
  securityDeposit: string;
  monthlyRent: string;
}

interface Tenant {
  name: string;
  email: string;
  phone: string;
  unit?: string;
  address?: string;
  tenantPortalStatus?: string;
  emergencyContact?: EmergencyContact;
  lease?: Lease;
}

interface Message {
  id: string | number;
  title: string;
  date: string;
  status: string;
}

export default function TenantPage() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState(0);
  const [tabHistory, setTabHistory] = useState<number[]>([]);
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(true);

  const tabLabels = ["Contact Info", "Lease Details", "Communications", "Reminder"];

  // Fetch tenant data
  useEffect(() => {
    fetch("http://localhost:5000/api/tenant")
      .then((res) => res.json())
      .then((data) => setTenant(data))
      .catch((err) => console.error(err));
  }, []);

  // Fetch messages when on Communications tab
  useEffect(() => {
    let interval: number;

    const fetchMessages = async () => {
      setLoadingMessages(true);
      try {
        const res = await fetch("http://localhost:5000/api/doorloop/messages");
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingMessages(false);
      }
    };

    if (activeTab === 2) {
      fetchMessages();
      interval = window.setInterval(fetchMessages, 10000);
    }

    return () => {
      if (interval) window.clearInterval(interval);
    };
  }, [activeTab]);

  // Filter messages by search
  const displayedMessages = messages.filter((msg) => {
    const q = searchQuery.toLowerCase();
    return (
      msg.title.toLowerCase().includes(q) ||
      msg.status.toLowerCase().includes(q) ||
      new Date(msg.date).toLocaleString().toLowerCase().includes(q)
    );
  });

  // Handle tab click
  const handleTabClick = (index: number) => {
    if (index !== activeTab) {
      setTabHistory((prev) => [...prev, activeTab]);
      setActiveTab(index);
    }
  };

  // Back button handler
  const handleBack = () => {
    if (tabHistory.length > 0) {
      const previous = tabHistory[tabHistory.length - 1];
      setTabHistory((prev) => prev.slice(0, prev.length - 1));
      setActiveTab(previous);
    } else {
      router.back();
    }
  };

  return (
    <div className="flex min-h-screen ">
      <div className=" flex-shrink-0">
        <NavSideBar />
      </div>
     

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header />

        <div className="p-10 ">
          <PageTitle pageTitle="Tenants" />
          <Tabs tabs={tabLabels} activeTab={activeTab} onTabClick={handleTabClick} />

          {/* ---------- TAB 0: Contact Info ---------- */}
          {activeTab === 0 && (
            <>
              <div className="flex justify-between items-center pt-10 pb-6 mr-[120px]">
                <ArrowAndDescription
                  description={tenant?.name || "Loading..."}
                  hasPreviousTab={tabHistory.length > 0}
                  onBack={handleBack}
                />
                <Button buttonName="Edit" variant="regular" />
              </div>

              <RegularCard
                title="Tenant Information"
                labels={["Name", "Email", "Phone", "Unit", "Address", "Portal Status"]}
                data={tenant || {}}
                height="330px"
                width="96%"
                labelsPerColumn={3}
                gapBetweenLabelValue = "gap-4"
              />

              <RegularCard
                title="Emergency Contact"
                labels={["Name", "Email", "Phone", "Relationship"]}
                data={tenant?.emergencyContact || {}}
                height="300px"
                width="96%"
                labelsPerColumn={3}
                gapBetweenLabelValue = "gap-4"
              />
            </>
          )}

          {/* ---------- TAB 1: Lease Details ---------- */}
          {activeTab === 1 && (
            <>
              <div className="flex justify-between items-center pt-10 pb-6 mr-[120px]">
                <ArrowAndDescription
                  description={tenant?.name || "Loading..."}
                  hasPreviousTab={tabHistory.length > 0}
                  onBack={handleBack}
                />
                <Button buttonName="Edit" variant="regular" />
              </div>

              <RegularCard
                title="Lease Information"
                labels={["Lease Start", "Lease End", "Property", "Security Deposit", "Monthly Rent"]}
                data={tenant?.lease || {}}
                height="420px"
                width="96%"
                labelsPerColumn={3}
                gapBetweenLabelValue = "gap-12"
               
                
              >
                <Button buttonName="View Full Lease" variant="long" />
                <Button buttonName="Download PDF" variant="long" />
                
              </RegularCard>
            </>
          )}

          {/* ---------- TAB 2: Communications ---------- */}
          {activeTab === 2 && (
            <>
              <div className="flex justify-between items-center pt-10 pb-6">
                <ArrowAndDescription
                  description={tenant?.name || "Loading..."}
                  hasPreviousTab={tabHistory.length > 0}
                  onBack={handleBack}
                />
              </div>

              <div className="pt-4 flex gap-4 ">
                <Button buttonName="Send New Message" variant="long" />
              </div>
              
              <SearchBar
                placeholderDescription="Search Communication"
                onChange={(value: string) => setSearchQuery(value)}
              />

              {loadingMessages ? (
                <div className="text-gray-500 pt-4">Loading messages...</div>
              ) : displayedMessages.length > 0 ? (
                <div className="flex flex-col gap-4 pt-4">
                  {displayedMessages.map((msg) => (
                    <SpecialCard key={msg.id} title={msg.title} date={msg.date} status={msg.status} />
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 pt-4 ">No messages found.</div>
              )}
            </>
          )}

          {/* ---------- TAB 3: Reminder ---------- */}
          {activeTab === 3 && (
            <>
              <div className="flex justify-between items-center pt-10 pb-6">
                <ArrowAndDescription
                  description={tenant?.name || "Loading..."}
                  hasPreviousTab={tabHistory.length > 0}
                  onBack={handleBack}
                />
              </div>

              <div className="pt-4 flex gap-4">
                <Button buttonName="Add Reminder" variant="long" />
              </div>

              <SearchBar
                placeholderDescription="Search Reminders"
                onChange={(value: string) => setSearchQuery(value)}
              />

              {loadingMessages ? (
                <div className="text-gray-500 pt-4">Loading reminders...</div>
              ) : displayedMessages.length > 0 ? (
                <div className="flex flex-col gap-4 pt-4">
                  {displayedMessages.map((msg) => (
                    <SpecialCard key={msg.id} title={msg.title} date={msg.date} status={msg.status} />
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 pt-4 pl-6">No reminders found.</div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
