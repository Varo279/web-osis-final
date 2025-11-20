import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Vote } from "lucide-react";
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

const Polling = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [polls, setPolls] = useState<Poll[]>(pollsData);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, number>>({});
  const [hasVoted, setHasVoted] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Load voting history from localStorage
    const votingHistory = localStorage.getItem("voting-history");
    if (votingHistory) {
      setHasVoted(JSON.parse(votingHistory));
    }

    // Load vote counts from localStorage
    const savedVotes = localStorage.getItem("poll-votes");
    if (savedVotes) {
      setPolls(JSON.parse(savedVotes));
    }
  }, []);

  const handleVote = (pollId: string) => {
    const selectedOption = selectedOptions[pollId];
    if (selectedOption === undefined) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Pilih salah satu opsi terlebih dahulu!",
      });
      return;
    }

    // Update votes
    const updatedPolls = polls.map((poll) => {
      if (poll.id === pollId) {
        const newVotes = [...poll.votes];
        newVotes[selectedOption] += 1;
        return { ...poll, votes: newVotes };
      }
      return poll;
    });

    setPolls(updatedPolls);
    localStorage.setItem("poll-votes", JSON.stringify(updatedPolls));

    // Mark as voted
    const newHasVoted = { ...hasVoted, [pollId]: true };
    setHasVoted(newHasVoted);
    localStorage.setItem("voting-history", JSON.stringify(newHasVoted));

    toast({
      title: "Vote berhasil!",
      description: "Terima kasih atas partisipasinya.",
    });
  };

  const activePolls = polls.filter((poll) => poll.active);

  if (activePolls.length === 0) {
    return (
      <>
        <Header />
        <div className="min-h-screen pt-24 pb-16 px-4">
          <div className="container mx-auto max-w-2xl">
            <Card className="p-8 text-center">
              <Vote className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-bold mb-2">Tidak Ada Polling Aktif</h2>
              <p className="text-muted-foreground mb-6">
                Saat ini tidak ada polling yang sedang berlangsung. Silakan cek kembali nanti!
              </p>
              <Button onClick={() => navigate("/")}>Kembali ke Beranda</Button>
            </Card>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen pt-24 pb-16 px-4 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
              Polling Anonim
            </h1>
            <p className="text-muted-foreground text-lg">
              Suaramu penting untuk kemajuan OSIS!
            </p>
          </div>

          <div className="space-y-8">
            {activePolls.map((poll, index) => (
              <Card
                key={poll.id}
                className="p-6 animate-slide-in hover:shadow-elegant transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2">{poll.title}</h2>
                  <p className="text-muted-foreground">{poll.description}</p>
                </div>

                {hasVoted[poll.id] ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-primary font-semibold mb-4">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Kamu sudah memberikan vote!</span>
                    </div>
                    <div className="space-y-3">
                      {poll.options.map((option, optIndex) => {
                        const totalVotes = poll.votes.reduce((a, b) => a + b, 0);
                        const percentage = totalVotes > 0 ? (poll.votes[optIndex] / totalVotes) * 100 : 0;
                        return (
                          <div key={optIndex} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span className="font-medium">{option}</span>
                              <span className="text-muted-foreground">
                                {poll.votes[optIndex]} vote ({percentage.toFixed(1)}%)
                              </span>
                            </div>
                            <div className="h-3 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-hero transition-all duration-500"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <p className="text-sm text-muted-foreground mt-4">
                      Total: {poll.votes.reduce((a, b) => a + b, 0)} votes
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <RadioGroup
                      value={selectedOptions[poll.id]?.toString()}
                      onValueChange={(value) =>
                        setSelectedOptions({ ...selectedOptions, [poll.id]: parseInt(value) })
                      }
                    >
                      {poll.options.map((option, optIndex) => (
                        <div key={optIndex} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                          <RadioGroupItem value={optIndex.toString()} id={`${poll.id}-${optIndex}`} />
                          <Label htmlFor={`${poll.id}-${optIndex}`} className="flex-1 cursor-pointer">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                    <Button onClick={() => handleVote(poll.id)} className="w-full" size="lg">
                      <Vote className="w-4 h-4 mr-2" />
                      Submit Vote
                    </Button>
                  </div>
                )}
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button variant="outline" onClick={() => navigate("/")}>
              Kembali ke Beranda
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Polling;
