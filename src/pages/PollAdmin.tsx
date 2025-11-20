import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Trash2, Plus, BarChart3, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import pollsData from "@/data/polls.json";

interface Poll {
  id: string;
  title: string;
  description: string;
  active: boolean;
  options: string[];
  votes: number[];
}

const PollAdmin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [polls, setPolls] = useState<Poll[]>([]);
  const [newOption, setNewOption] = useState<Record<string, string>>({});

  useEffect(() => {
    // Load polls with saved vote counts
    const savedVotes = localStorage.getItem("poll-votes");
    if (savedVotes) {
      setPolls(JSON.parse(savedVotes));
    } else {
      setPolls(pollsData);
    }
  }, []);

  const updatePoll = (pollId: string, updates: Partial<Poll>) => {
    const updatedPolls = polls.map((poll) =>
      poll.id === pollId ? { ...poll, ...updates } : poll
    );
    setPolls(updatedPolls);
    localStorage.setItem("poll-votes", JSON.stringify(updatedPolls));
    toast({
      title: "Berhasil",
      description: "Poll berhasil diupdate!",
    });
  };

  const addOption = (pollId: string) => {
    const optionText = newOption[pollId]?.trim();
    if (!optionText) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Masukkan nama opsi terlebih dahulu!",
      });
      return;
    }

    const updatedPolls = polls.map((poll) => {
      if (poll.id === pollId) {
        return {
          ...poll,
          options: [...poll.options, optionText],
          votes: [...poll.votes, 0],
        };
      }
      return poll;
    });

    setPolls(updatedPolls);
    setNewOption({ ...newOption, [pollId]: "" });
    localStorage.setItem("poll-votes", JSON.stringify(updatedPolls));
    toast({
      title: "Berhasil",
      description: "Opsi berhasil ditambahkan!",
    });
  };

  const removeOption = (pollId: string, optionIndex: number) => {
    const updatedPolls = polls.map((poll) => {
      if (poll.id === pollId) {
        const newOptions = poll.options.filter((_, i) => i !== optionIndex);
        const newVotes = poll.votes.filter((_, i) => i !== optionIndex);
        return { ...poll, options: newOptions, votes: newVotes };
      }
      return poll;
    });

    setPolls(updatedPolls);
    localStorage.setItem("poll-votes", JSON.stringify(updatedPolls));
    toast({
      title: "Berhasil",
      description: "Opsi berhasil dihapus!",
    });
  };

  const resetVotes = (pollId: string) => {
    if (!confirm("Reset semua votes untuk poll ini?")) return;

    const updatedPolls = polls.map((poll) => {
      if (poll.id === pollId) {
        return { ...poll, votes: poll.votes.map(() => 0) };
      }
      return poll;
    });

    setPolls(updatedPolls);
    localStorage.setItem("poll-votes", JSON.stringify(updatedPolls));
    
    // Also reset voting history
    const votingHistory = localStorage.getItem("voting-history");
    if (votingHistory) {
      const history = JSON.parse(votingHistory);
      delete history[pollId];
      localStorage.setItem("voting-history", JSON.stringify(history));
    }
    
    toast({
      title: "Berhasil",
      description: "Votes berhasil direset!",
    });
  };

  return (
    <>
      <Header />
      <div className="min-h-screen pt-24 pb-16 px-4 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
              Admin Polling
            </h1>
            <p className="text-muted-foreground text-lg">
              Kelola dan lihat hasil polling
            </p>
          </div>

          <div className="space-y-8">
            {polls.map((poll, index) => (
              <Card
                key={poll.id}
                className="p-6 animate-slide-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="space-y-6">
                  {/* Poll Settings */}
                  <div className="flex items-center justify-between pb-4 border-b border-border">
                    <div className="space-y-1 flex-1">
                      <Label htmlFor={`title-${poll.id}`}>Judul Poll</Label>
                      <Input
                        id={`title-${poll.id}`}
                        value={poll.title}
                        onChange={(e) => updatePoll(poll.id, { title: e.target.value })}
                        className="text-xl font-bold"
                      />
                    </div>
                    <div className="flex items-center gap-3 ml-4">
                      <Label htmlFor={`active-${poll.id}`}>Aktif</Label>
                      <Switch
                        id={`active-${poll.id}`}
                        checked={poll.active}
                        onCheckedChange={(checked) => updatePoll(poll.id, { active: checked })}
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor={`desc-${poll.id}`}>Deskripsi</Label>
                    <Textarea
                      id={`desc-${poll.id}`}
                      value={poll.description}
                      onChange={(e) => updatePoll(poll.id, { description: e.target.value })}
                      rows={2}
                    />
                  </div>

                  {/* Results */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <BarChart3 className="w-5 h-5" />
                        Hasil Voting
                      </h3>
                      <Button variant="destructive" size="sm" onClick={() => resetVotes(poll.id)}>
                        Reset Votes
                      </Button>
                    </div>

                    <div className="space-y-3">
                      {poll.options.map((option, optIndex) => {
                        const totalVotes = poll.votes.reduce((a, b) => a + b, 0);
                        const percentage = totalVotes > 0 ? (poll.votes[optIndex] / totalVotes) * 100 : 0;
                        return (
                          <div key={optIndex} className="space-y-2 p-3 bg-muted/30 rounded-lg">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">{option}</span>
                              <div className="flex items-center gap-3">
                                <span className="text-sm text-muted-foreground">
                                  {poll.votes[optIndex]} votes ({percentage.toFixed(1)}%)
                                </span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeOption(poll.id, optIndex)}
                                  className="h-8 w-8 p-0"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-hero transition-all duration-500"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <p className="text-sm text-muted-foreground">
                      Total Votes: {poll.votes.reduce((a, b) => a + b, 0)}
                    </p>
                  </div>

                  {/* Add Option */}
                  <div className="space-y-2 pt-4 border-t border-border">
                    <Label htmlFor={`new-option-${poll.id}`}>Tambah Opsi Baru</Label>
                    <div className="flex gap-2">
                      <Input
                        id={`new-option-${poll.id}`}
                        value={newOption[poll.id] || ""}
                        onChange={(e) => setNewOption({ ...newOption, [poll.id]: e.target.value })}
                        placeholder="Nama opsi..."
                      />
                      <Button onClick={() => addOption(poll.id)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Tambah
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-8 flex gap-4 justify-center">
            <Button variant="outline" onClick={() => navigate("/")}>
              Kembali ke Beranda
            </Button>
            <Button onClick={() => navigate("/polling")}>
              Lihat Polling User
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PollAdmin;
